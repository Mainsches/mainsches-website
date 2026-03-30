export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message, company } = req.body || {};

  if (company) {
    return res.status(400).json({ error: "Spam detected" });
  }

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  return res.status(200).json({
    success: true,
    message: "API route is working. Mail sending comes next."
  });
}
