import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // SCALABLE ANALYTICS & ADS TRACKING PROXY
  // ==========================================
  app.post("/api/track", async (req, res) => {
    // Highly scalable architecture:
    // This endpoint aggregates client-side events and pushes them to Server-Side APIs
    // e.g., Meta Conversions API, Google Analytics Measurement Protocol
    
    const { event, payload, timestamp } = req.body;
    
    console.log(`[Analytics Engine] Received event: ${event}`, payload);

    // Mock: Pushing to Meta CAPI
    // if (process.env.META_CAPI_TOKEN) { ... }
    
    // Mock: Pushing to Google Server-Side Tagging
    // if (process.env.GOOGLE_MEASUREMENT_ID) { ... }

    res.json({ success: true, timestamp });
  });

  // ==========================================
  // FLABS LIS INTEGRATION API
  // ==========================================
  
  // Helper to generate FLabs Auth Token
  async function getFlabsAuthToken() {
    const clientId = process.env.FLABS_CLIENT_ID;
    const clientSecret = process.env.FLABS_CLIENT_SECRET;
    const baseUrl = process.env.FLABS_API_BASE_URL || 'https://api.flabslis.com';

    if (!clientId || !clientSecret) {
      throw new Error("FLabs credentials missing in environment variables (.env)");
    }

    const response = await fetch(`${baseUrl}/api/v1/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret })
    });

    if (!response.ok) throw new Error("Failed to authenticate with FLabs");
    const data = await response.json();
    return data.access_token;
  }

  app.post("/api/lis/download-report", async (req, res) => {
    // This endpoint connects to FLabs securely on the server.
    
    const { patientId, reportId, otp } = req.body;
    
    console.log(`[FLabs Engine] Requesting report for Patient: ${patientId}`);

    // Standard Validation
    if (!patientId || !reportId || typeof patientId !== 'string' || typeof reportId !== 'string') {
      return res.status(400).json({ error: "Invalid or missing required parameters for LIS" });
    }

    try {
      if (process.env.FLABS_CLIENT_ID) {
        const token = await getFlabsAuthToken();
        const baseUrl = process.env.FLABS_API_BASE_URL || 'https://api.flabslis.com';
        
        // Fetch the report from FLabs securely with URL encoding to prevent SSRF / Path Traversal
        const safePatientId = encodeURIComponent(patientId);
        const safeReportId = encodeURIComponent(reportId);
        const reportResponse = await fetch(`${baseUrl}/api/v1/patients/${safePatientId}/reports/${safeReportId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!reportResponse.ok) {
          throw new Error("Report not found in FLabs LIS");
        }
        
        const reportData = await reportResponse.json();
        return res.json({
          success: true,
          downloadUrl: reportData.pdf_url || reportData.download_url,
          reportMetadata: reportData.metadata
        });
      }
      
      // Returning Mock Data Structure
      res.json({
        success: true,
        downloadUrl: "https://example.com/mock-report.pdf",
        reportMetadata: {
          status: "VERIFIED",
          signedBy: "Dr. Consultant",
          generatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("[LIS Engine Error]", error);
      res.status(500).json({ error: "Failed to communicate with LIS integration" });
    }
  });

  // ==========================================
  // VITE MIDDLEWARE (Dev) & STATIC FILES (Prod)
  // ==========================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Scalable Architecture] Server running on http://localhost:${PORT}`);
  });
}

startServer();
