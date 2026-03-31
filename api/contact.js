import nodemailer from "nodemailer";

const rateLimitStore = global.rateLimitStore || new Map();
global.rateLimitStore = rateLimitStore;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ip = getClientIp(req);
    const now = Date.now();

    cleanupRateLimitStore(now);

    if (!checkRateLimit(ip, now)) {
      return res.status(429).json({
        error: "Too many requests. Please try again later."
      });
    }

    const {
      name = "",
      email = "",
      subject = "",
      message = "",
      company = "",
      website = "",
      formStartedAt = ""
    } = req.body || {};

    if (company || website) {
      return res.status(400).json({ error: "Spam detected" });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanSubject = String(subject).trim();
    const cleanMessage = String(message).trim();

    if (formStartedAt) {
      const started = Number(formStartedAt);
      if (Number.isFinite(started)) {
        const elapsed = now - started;
        if (elapsed < 3000) {
          return res.status(400).json({ error: "Form submitted too quickly." });
        }
      }
    }

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({ error: "Invalid name length." });
    }

    if (cleanEmail.length < 5 || cleanEmail.length > 200) {
      return res.status(400).json({ error: "Invalid email length." });
    }

    if (cleanSubject.length < 3 || cleanSubject.length > 150) {
      return res.status(400).json({ error: "Invalid subject length." });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
      return res.status(400).json({ error: "Invalid message length." });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    if (looksSpammy(cleanSubject, cleanMessage)) {
      return res.status(400).json({ error: "Message looks like spam." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Mainsches Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: cleanEmail,
      subject: `New message from ${cleanName} — ${cleanSubject}`,
      text: `
New contact form message

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
IP: ${ip}

Message:
${cleanMessage}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 640px; margin: 0 auto; padding: 24px;">
          <div style="border: 1px solid #e5e5e5; border-radius: 16px; overflow: hidden;">
            <div style="background: #000; color: #fff; padding: 20px 24px;">
              <h2 style="margin: 0; font-size: 22px;">New contact form message</h2>
            </div>

            <div style="padding: 24px; background: #fff;">
              <p style="margin: 0 0 16px;"><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
              <p style="margin: 0 0 16px;"><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
              <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
              <p style="margin: 0 0 20px;"><strong>IP:</strong> ${escapeHtml(ip)}</p>

              <p style="margin: 0 0 10px;"><strong>Message:</strong></p>
              <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 14px; border-radius: 12px; background: #fafafa;">
                ${escapeHtml(cleanMessage)}
              </div>
            </div>
          </div>
        </div>
      `
    });

    await transporter.sendMail({
      from: `"Mainsches" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: "Mainsches — Message received",
      text: `
Hi ${cleanName},

thanks for contacting Mainsches.

We have received your message successfully and will get back to you as soon as possible.

Your subject:
${cleanSubject}

Best regards,
Mainsches
mainsches.com
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111; max-width: 640px; margin: 0 auto; padding: 24px;">
          <div style="border: 1px solid #e5e5e5; border-radius: 16px; overflow: hidden;">
            <div style="background: #000; color: #fff; padding: 20px 24px;">
              <h2 style="margin: 0; font-size: 22px;">Message received</h2>
            </div>

            <div style="padding: 24px; background: #fff;">
              <p style="margin: 0 0 16px;">Hi ${escapeHtml(cleanName)},</p>

              <p style="margin: 0 0 16px;">
                thanks for contacting <strong>Mainsches</strong>.
              </p>

              <p style="margin: 0 0 16px;">
                We have received your message successfully and will get back to you as soon as possible.
              </p>

              <div style="margin: 22px 0; padding: 14px 16px; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">
                <p style="margin: 0 0 6px; color: #666; font-size: 14px;">Your subject</p>
                <p style="margin: 0; font-weight: 600;">${escapeHtml(cleanSubject)}</p>
              </div>

              <p style="margin: 24px 0 0;">
                Best regards,<br>
                <strong>Mainsches</strong><br>
                <span style="color: #666;">mainsches.com</span>
              </p>
            </div>
          </div>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully."
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Failed to send message."
    });
  }
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function checkRateLimit(ip, now) {
  const key = ip || "unknown";
  const existing = rateLimitStore.get(key) || [];

  const recent = existing.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(key, recent);
    return false;
  }

  recent.push(now);
  rateLimitStore.set(key, recent);
  return true;
}

function cleanupRateLimitStore(now) {
  for (const [key, timestamps] of rateLimitStore.entries()) {
    const recent = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );
    if (recent.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, recent);
    }
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function looksSpammy(subject, message) {
  const text = `${subject} ${message}`.toLowerCase();

  const spamTerms = [
    "crypto",
    "bitcoin",
    "casino",
    "seo service",
    "buy now",
    "cheap price",
    "viagra",
    "loan",
    "backlink"
  ];

  const hasSpamTerm = spamTerms.some((term) => text.includes(term));
  const urlMatches = text.match(/https?:\/\/|www\./g) || [];
  const tooManyLinks = urlMatches.length >= 3;
  const tooManyRepeats = /(.)\1{7,}/.test(text);

  return hasSpamTerm || tooManyLinks || tooManyRepeats;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
