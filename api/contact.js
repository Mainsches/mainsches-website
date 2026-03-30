import nodemailer from "nodemailer";

const rateLimitStore = global.rateLimitStore || new Map();
global.rateLimitStore = rateLimitStore;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
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

    // Honeypot-Felder: echte Nutzer füllen diese nicht aus
    if (company || website) {
      return res.status(400).json({ error: "Spam detected" });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanSubject = String(subject).trim();
    const cleanMessage = String(message).trim();

    // Zeitprüfung: Bots senden oft "zu schnell"
    if (formStartedAt) {
      const started = Number(formStartedAt);
      if (Number.isFinite(started)) {
        const elapsed = now - started;
        if (elapsed < 3000) {
          return res.status(400).json({ error: "Form submitted too quickly." });
        }
      }
    }

    // Basis-Validierung
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

    // Primitive Spam-Heuristik
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
      from: `"Mainsches Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: cleanEmail,
      subject: `[Mainsches] ${cleanSubject}`,
      text: `
Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
IP: ${ip}

Message:
${cleanMessage}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New contact form message</h2>
          <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
          <p><strong>IP:</strong> ${escapeHtml(ip)}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px; border-radius: 8px;">
            ${escapeHtml(cleanMessage)}
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
