/**
 * Cloudflare Worker: LIS Report Proxy
 *
 * ARCHITECTURAL NOTICE:
 * The in-memory rate limiter below is per-isolate (ephemeral). In Cloudflare Workers,
 * global memory is not shared across geographic edge PoPs or worker recycles.
 * For production multi-edge deployments with strict anti-enumeration guarantees,
 * bind this worker to Cloudflare KV or a Durable Object / Cloudflare Rate Limiting API.
 */

export interface Env {
  LIS_UPSTREAM_URL: string;
  LIS_API_SECRET: string;
}

const ALLOWED_ORIGINS = new Set([
  'https://sawariyadiagnostic.github.io',
  'https://sawariyadiagnostic.in',
  'https://www.sawariyadiagnostic.in',
  'http://localhost:5173',
]);

// Lightweight per-isolate rate limiter (Max 5 report lookups per 10 mins per IP)
const ipAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const record = ipAttempts.get(ip);

  if (!record || now > record.resetAt) {
    ipAttempts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= 5) {
    return false;
  }
  record.count += 1;
  return true;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || '';
    const corsOrigin = ALLOWED_ORIGINS.has(origin)
      ? origin
      : 'https://sawariyadiagnostic.github.io';

    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-store, no-cache, must-revalidate',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({
          error: 'Too many lookup attempts. Please wait 10 minutes or contact lab reception on WhatsApp.',
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      const body = (await request.json()) as { mobile?: string; labId?: string };
      const mobileClean = (body.mobile || '').replace(/\D/g, '').slice(-10);
      const labIdClean = (body.labId || '').trim().toUpperCase();

      // Strict Dual-Factor Validation (Prevents IDOR enumeration)
      const isValidMobile = /^[6-9]\d{9}$/.test(mobileClean);
      const isValidLabId = /^[A-Z0-9-]{4,20}$/.test(labIdClean);

      if (!isValidMobile || !isValidLabId) {
        return new Response(
          JSON.stringify({
            error: 'Please enter both a valid 10-digit registered mobile number and your Lab ID / Barcode.',
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!env.LIS_UPSTREAM_URL || !env.LIS_API_SECRET) {
        return new Response(
          JSON.stringify({
            error: 'LIS upstream service not configured. Please contact lab desk directly.',
          }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Forward verified request to upstream LIS/Supabase storage
      const upstreamRes = await fetch(`${env.LIS_UPSTREAM_URL}/verify-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.LIS_API_SECRET}`,
        },
        body: JSON.stringify({ mobile: mobileClean, labId: labIdClean }),
      });

      if (!upstreamRes.ok) {
        return new Response(
          JSON.stringify({
            error: 'No matching report found for this Mobile + Lab ID combination.',
          }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await upstreamRes.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid request payload.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  },
};
