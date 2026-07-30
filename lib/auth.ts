/**
 * Cloudflare Workers AI — server-side only.
 *
 * HOW TO USE (copy this pattern — do not invent other CF API clients):
 *
 * 1. Route Handler (app/api/…/route.ts):
 *    import { runWorkersAi } from "@/lib/auth";
 *    const text = await runWorkersAi({ prompt: userText, system: "…" });
 *
 * 2. Client: fetch YOUR /api/* only — never call api.cloudflare.com from the browser.
 *
 * 3. Vision (photos): runWorkersAiVision({ prompt, imageBase64, mimeType })
 *
 * Env (set by Autodev / Vercel): CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN
 */

export const CF_TEXT_MODEL = "@cf/meta/llama-3.1-8b-instruct";
export const CF_VISION_MODEL = "@cf/meta/llama-3.2-11b-vision-instruct";

export type CfAiAuth = {
  accountId: string;
  apiToken: string;
};

export function getCfAiAuth(): CfAiAuth {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) {
    throw new Error(
      "Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN — set them in .env.local / Vercel env",
    );
  }
  return { accountId, apiToken };
}

export function cfAiEndpoint(model: string = CF_TEXT_MODEL): string {
  const { accountId } = getCfAiAuth();
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
}

function extractText(json: unknown): string {
  if (!json || typeof json !== "object") {
    throw new Error("Workers AI returned non-JSON body");
  }
  const root = json as {
    success?: boolean;
    errors?: { message?: string }[];
    result?: unknown;
    response?: unknown;
  };
  if (root.success === false) {
    const msg = root.errors?.map((e) => e.message).filter(Boolean).join("; ");
    throw new Error(`Workers AI error: ${msg || JSON.stringify(root)}`);
  }

  const result = root.result;
  if (typeof result === "string" && result.trim()) return result.trim();
  if (result && typeof result === "object") {
    const r = result as { response?: unknown; description?: unknown };
    if (typeof r.response === "string" && r.response.trim()) {
      return r.response.trim();
    }
    if (typeof r.response === "object" && r.response) {
      return JSON.stringify(r.response);
    }
    if (typeof r.description === "string" && r.description.trim()) {
      return r.description.trim();
    }
  }
  if (typeof root.response === "string" && root.response.trim()) {
    return root.response.trim();
  }
  throw new Error(`Workers AI returned empty response: ${JSON.stringify(json).slice(0, 400)}`);
}

async function postWorkersAi(model: string, body: unknown): Promise<string> {
  const { apiToken } = getCfAiAuth();
  const res = await fetch(cfAiEndpoint(model), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error(`Workers AI ${res.status}: ${raw.slice(0, 500)}`);
  }
  if (!res.ok) {
    throw new Error(`Workers AI ${res.status}: ${raw.slice(0, 500)}`);
  }
  return extractText(json);
}

/**
 * Text generation via Workers AI REST.
 * Uses official `{ prompt }` body (and messages when system is set).
 */
export async function runWorkersAi(opts: {
  prompt: string;
  system?: string;
  model?: string;
  maxTokens?: number;
}): Promise<string> {
  const model = opts.model ?? CF_TEXT_MODEL;
  const max_tokens = opts.maxTokens ?? 1024;

  if (opts.system?.trim()) {
    return postWorkersAi(model, {
      messages: [
        { role: "system", content: opts.system },
        { role: "user", content: opts.prompt },
      ],
      max_tokens,
    });
  }

  return postWorkersAi(model, {
    prompt: opts.prompt,
    max_tokens,
  });
}

/**
 * Vision: send a photo as raw base64 (no data: prefix) + text prompt.
 * Official Workers AI body: { prompt, image } — not OpenAI-style image_url.
 * Client POSTs imageBase64 to your /api route; never put the CF token in the browser.
 */
export async function runWorkersAiVision(opts: {
  prompt: string;
  imageBase64: string;
  mimeType?: string;
  model?: string;
  maxTokens?: number;
}): Promise<string> {
  const model = opts.model ?? CF_VISION_MODEL;
  const b64 = opts.imageBase64.replace(/^data:[^;]+;base64,/, "");

  return postWorkersAi(model, {
    prompt: opts.prompt,
    image: b64,
    max_tokens: opts.maxTokens ?? 1024,
  });
}
