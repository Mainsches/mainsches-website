import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  invalidServicesFields,
  serviceInterestMailLabel,
  servicesRequestSchema,
} from "@/lib/services/schema";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const globalStore = globalThis as typeof globalThis & {
  servicesRateLimit?: Map<string, number[]>;
};
const rateLimitStore = (globalStore.servicesRateLimit ??= new Map<
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

  const parsed = servicesRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        fields: invalidServicesFields(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

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

  const interestLabel = serviceInterestMailLabel(data.interest, data.locale);
  const localeLabel = data.locale === "de" ? "Deutsch" : "English";

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
      ["Company", data.company || "—"],
      ["Phone", data.phone || "—"],
      ["Service", interestLabel],
      ["Language", localeLabel],
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
      from: `"Mainsches Angebot" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: data.email,
      subject: `Neue Angebotsanfrage – ${interestLabel}`,
      text: [
        "New services enquiry",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || "—"}`,
        `Phone: ${data.phone || "—"}`,
        `Service: ${interestLabel}`,
        `Language: ${localeLabel}`,
        `IP: ${ip}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:640px;margin:0 auto;padding:24px">
          <div style="border:1px solid #e5e5e5;border-radius:16px;overflow:hidden">
            <div style="background:#0b0b0c;color:#fff;padding:20px 24px">
              <h2 style="margin:0;font-size:20px">New services enquiry</h2>
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
    console.error("Services form mail error:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 },
    );
  }
}
