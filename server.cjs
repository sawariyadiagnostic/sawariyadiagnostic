var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var PORT = Number(process.env.PORT || 3e3);
var MAX_EVENT_NAME_LENGTH = 80;
var isSafeEventName = (value) => typeof value === "string" && /^[a-zA-Z0-9_.:-]{1,80}$/.test(value);
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
    signal: AbortSignal.timeout(1e4)
  });
  if (!response.ok) throw new Error("LIS authentication failed");
  const data = await response.json();
  if (!data.access_token) throw new Error("LIS authentication returned no token");
  return data.access_token;
}
async function startServer() {
  const app = (0, import_express.default)();
  app.disable("x-powered-by");
  app.use(import_express.default.json({ limit: "32kb", strict: true }));
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "sawariya-diagnostic-web" });
  });
  app.post("/api/track", (req, res) => {
    const { event, timestamp } = req.body ?? {};
    if (!isSafeEventName(event) || event.length > MAX_EVENT_NAME_LENGTH) {
      return res.status(400).json({ error: "Invalid analytics event" });
    }
    if (timestamp !== void 0 && typeof timestamp !== "string") {
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
      const baseUrl = process.env.FLABS_API_BASE_URL;
      const reportResponse = await fetch(`${baseUrl}/api/v1/patients/${encodeURIComponent(patientId)}/reports/${encodeURIComponent(reportId)}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(15e3)
      });
      if (!reportResponse.ok) return res.status(404).json({ error: "Report not found" });
      const reportData = await reportResponse.json();
      return res.json({ success: true, downloadUrl: reportData.pdf_url || reportData.download_url, reportMetadata: reportData.metadata });
    } catch {
      return res.status(503).json({ error: "Report service is temporarily unavailable", code: "LIS_UNAVAILABLE" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath, { fallthrough: false }));
    app.get("*", (_req, res) => res.sendFile(import_path.default.join(distPath, "index.html")));
  }
  app.use((_req, res) => res.status(404).json({ error: "Not found" }));
  app.listen(PORT, "0.0.0.0", () => console.info(`Sawariya web server listening on port ${PORT}`));
}
startServer().catch((error) => {
  console.error("Server startup failed", error instanceof Error ? error.message : "unknown error");
  process.exitCode = 1;
});
//# sourceMappingURL=server.cjs.map
