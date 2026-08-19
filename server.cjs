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
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/track", async (req, res) => {
    const { event, payload, timestamp } = req.body;
    console.log(`[Analytics Engine] Received event: ${event}`, payload);
    res.json({ success: true, timestamp });
  });
  app.post("/api/lis/download-report", async (req, res) => {
    const { patientId, reportId, otp } = req.body;
    console.log(`[LIS Engine] Requesting report for Patient: ${patientId}`);
    if (!patientId || !reportId) {
      return res.status(400).json({ error: "Missing required parameters for LIS" });
    }
    try {
      res.json({
        success: true,
        downloadUrl: "https://example.com/mock-report.pdf",
        reportMetadata: {
          status: "VERIFIED",
          signedBy: "Dr. Consultant",
          generatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    } catch (error) {
      console.error("[LIS Engine Error]", error);
      res.status(500).json({ error: "Failed to communicate with LIS integration" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Scalable Architecture] Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
