import { toast } from "sonner";
import { Analytics } from "./analytics";

/**
 * LIS Integration Client Service
 * Handles communication with the secure backend proxy to interact with LIS software
 */

export const LISClient = {
  /**
   * Securely requests a report from the internal LIS
   */
  downloadReport: async (patientId: string, reportId: string, otp?: string) => {
    try {
      const res = await fetch("/api/lis/download-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, reportId, otp })
      });

      if (!res.ok) {
        throw new Error("Failed to authenticate or retrieve report from LIS");
      }

      const data = await res.json();
      
      if (data.success && data.downloadUrl) {
        Analytics.reportDownloaded(reportId);
        toast.success("Report successfully retrieved from LIS");
        
        if (!data.downloadUrl) throw new Error("LIS returned no downloadable report");
        window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
        return data;
      }
      
      throw new Error("Invalid response format from LIS");
    } catch (e) {
      console.error("[LIS Client] Error", e);
      toast.error("Failed to retrieve report. Please verify Patient ID.");
      throw e;
    }
  }
};
