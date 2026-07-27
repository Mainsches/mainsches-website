import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { invalidFields, pilotRequestSchema } from "@/lib/pilot/schema";

export const runtime = "nodejs";

/* -------------------------------------------------------------------------
 * Simple per-instance rate limiting (same approach as the previous
 * api/contact.js Vercel function this route replaces).
 * ---------------------------------------------------------------------- */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const globalStore = globalThis as typeof globalThis & {
  pilotRateLimit?: Map<string, number[]>;
};
const rateLimitStore = (globalStore.pilotRateLimit ??= new Map<
  string,
  number[]
>());

function allowRequest(ip: string, now: number): boolean {
  const recent = (rateLimitStore.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  if (recent.length >= MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return false;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return true;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Mail adapter for the pilot form. Uses the same environment variables as
 * the legacy contact function (SMTP_HOST/PORT/USER/PASS, CONTACT_TO), so an
 * already-configured Vercel project needs no changes. When they are absent,
 * the route reports 503 { configured: false } and the client shows an honest
 * fallback instead of a fake success.
 */
export async function POST(request: Request) {
  const now = Date.now();
  const ip = clientIp(request);

  if (!allowRequest(ip, now)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = pilotRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", fields: invalidFields(parsed.error) },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot filled or form submitted inhumanly fast → treat as spam.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: false, error: "spam" }, { status: 400 });
  }
  if (
    typeof data.formStartedAt === "number" &&
    Number.isFinite(data.formStartedAt) &&
    now - data.formStartedAt < 3000
  ) {
    return NextResponse.json({ ok: false, error: "too_fast" }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    return NextResponse.json(
      { ok: false, configured: false, error: "not_configured" },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const rows = [
      ["Name", data.name],
      ["Email", data.email],
      ["Company", data.company],
      ["Role", data.role],
      ["Interest", data.interest],
      ["IP", ip],
    ]
      .map(
        ([label, value]) =>
          `<p style="margin:0 0 12px"><strong>${label}:</strong> ${escapeHtml(
            String(value),
          )}</p>`,
      )
      .join("");

    await transporter.sendMail({
      from: `"Mainsches Hub Pilot" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: data.email,
      subject: `Pilot request (${data.interest}) — ${data.name}, ${data.company}`,
      text: [
        "New pilot program request",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Role: ${data.role}`,
        `Interest: ${data.interest}`,
        `IP: ${ip}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:640px;margin:0 auto;padding:24px">
          <div style="border:1px solid #e5e5e5;border-radius:16px;overflow:hidden">
            <div style="background:#0b0b0c;color:#fff;padding:20px 24px">
              <h2 style="margin:0;font-size:20px">New pilot program request</h2>
            </div>
            <div style="padding:24px;background:#fff">
              ${rows}
              <p style="margin:16px 0 8px"><strong>Message:</strong></p>
              <div style="white-space:pre-wrap;border:1px solid #ddd;padding:14px;border-radius:12px;background:#fafafa">${escapeHtml(
                data.message,
              )}</div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Pilot form mail error:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 },
    );
  }
}
