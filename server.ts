import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const PORT = Number(process.env.PORT || 3000);
const MAX_EVENT_NAME_LENGTH = 80;

const isSafeEventName = (value: unknown): value is string =>
  typeof value === "string" && /^[a-zA-Z0-9_.:-]{1,80}$/.test(value);

async function getFlabsAuthToken() {
  const clientId = process.env.FLABS_CLIENT_ID;
  const clientSecret = process.env.FLABS_CLIENT_SECRET;
  const baseUrl = process.env.FLABS_API_BASE_URL;

  if (!clientId || !clientSecret || !baseUrl) {
    throw new Error("LIS integration is not configured");
  }

  const response = await fetch(`${baseUrl}/api/v1/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error("LIS authentication failed");
  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("LIS authentication returned no token");
  return data.access_token;
}

async function startServer() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "32kb", strict: true }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "sawariya-diagnostic-web" });
  });

  app.post("/api/track", (req, res) => {
    const { event, timestamp } = req.body ?? {};
    if (!isSafeEventName(event) || event.length > MAX_EVENT_NAME_LENGTH) {
      return res.status(400).json({ error: "Invalid analytics event" });
    }
    if (timestamp !== undefined && typeof timestamp !== "string") {
      return res.status(400).json({ error: "Invalid analytics timestamp" });
    }
    return res.status(202).json({ accepted: true });
  });

  app.post("/api/lis/download-report", async (req, res) => {
    const { patientId, reportId } = req.body ?? {};
    if (typeof patientId !== "string" || typeof reportId !== "string" || !patientId || !reportId) {
      return res.status(400).json({ error: "Missing required report identifiers" });
    }
    if (patientId.length > 120 || reportId.length > 120) {
      return res.status(400).json({ error: "Report identifiers are too long" });
    }

    try {
      const token = await getFlabsAuthToken();
      const baseUrl = process.env.FLABS_API_BASE_URL as string;
      const reportResponse = await fetch(`${baseUrl}/api/v1/patients/${encodeURIComponent(patientId)}/reports/${encodeURIComponent(reportId)}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(15_000),
      });
      if (!reportResponse.ok) return res.status(404).json({ error: "Report not found" });
      const reportData = (await reportResponse.json()) as { pdf_url?: string; download_url?: string; metadata?: unknown };
      return res.json({ success: true, downloadUrl: reportData.pdf_url || reportData.download_url, reportMetadata: reportData.metadata });
    } catch {
      return res.status(503).json({ error: "Report service is temporarily unavailable", code: "LIS_UNAVAILABLE" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { fallthrough: false }));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.use((_req, res) => res.status(404).json({ error: "Not found" }));
  app.listen(PORT, "0.0.0.0", () => console.info(`Sawariya web server listening on port ${PORT}`));
}

startServer().catch((error) => {
  console.error("Server startup failed", error instanceof Error ? error.message : "unknown error");
  process.exitCode = 1;
});
