/**
 * Highly Scalable Analytics Engine
 * Abstracted to handle multiple providers (Meta CAPI, Google Ads, GA4)
 * and route them through our secure backend proxy.
 */

export const Analytics = {
  track: async (eventName: string, payload: Record<string, unknown> = {}) => {
    try {
      console.log(`[Analytics Client] Tracking: ${eventName}`, payload);
      
      // Send to scalable backend proxy to protect tracking pixels/tokens
      // and ensure server-side delivery (CAPI)
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventName,
          payload,
          timestamp: new Date().toISOString(),
          // include anonymous user ID / session ID here for CAPI dedup
        })
      });
    } catch (e) {
      console.error("[Analytics Engine] Failed to dispatch event", e);
    }
  },

  pageView: (path: string) => Analytics.track("PAGE_VIEW", { path }),
  leadContact: (source: string) => Analytics.track("LEAD_CONTACT", { source }),
  reportDownloaded: (reportId: string) => Analytics.track("REPORT_DOWNLOAD", { reportId }),
  testViewed: (testName: string) => Analytics.track("TEST_VIEW", { testName })
};
