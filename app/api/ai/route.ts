import { NextResponse } from "next/server";
import { runWorkersAi, runWorkersAiVision } from "@/lib/auth";

/**
 * Canonical Workers AI proxy — Autodev scaffolds this when usesAi=true.
 * Client → POST /api/ai { prompt, system?, imageBase64?, mimeType? }
 * Never call api.cloudflare.com from the browser.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      prompt?: unknown;
      system?: unknown;
      imageBase64?: unknown;
      mimeType?: unknown;
    };

    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const system =
      typeof body.system === "string" && body.system.trim()
        ? body.system.trim()
        : undefined;
    const imageBase64 =
      typeof body.imageBase64 === "string" && body.imageBase64
        ? body.imageBase64
        : undefined;
    const mimeType =
      typeof body.mimeType === "string" ? body.mimeType : undefined;

    const text = imageBase64
      ? await runWorkersAiVision({ prompt, imageBase64, mimeType })
      : await runWorkersAi({ prompt, system });

    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
