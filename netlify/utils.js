const nodemailer = require('nodemailer')

function sendEmail(from, to, subject, html, replyTo, attachments) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    attachments,
    replyTo,
  })
}

function validateRequest(body, requiredFields) {
  for (const key of requiredFields) {
    if (!(key in body)) {
      return `'${key}' is required!`
    }
  }
}

// Loose sanity check: something@something.something, no whitespace or angle brackets
// (the latter would allow header injection into replyTo). Not a full RFC validator.
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

// Trim, enforce bounds and email format. Returns { values } or { error }. Never throws.
// spec: { field: { min?, max, email? } }
function readFields(body, spec) {
  const values = {}
  for (const [key, rule] of Object.entries(spec)) {
    const raw = typeof body[key] === 'string' ? body[key].trim() : ''
    if (!raw) return { error: `'${key}' is required!` }
    if (raw.length < (rule.min || 1)) return { error: `'${key}' is too short.` }
    if (raw.length > rule.max) return { error: `'${key}' is too long.` }
    if (rule.email && !EMAIL_RE.test(raw)) return { error: 'Invalid email address.' }
    values[key] = raw
  }
  return { values }
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

module.exports = { sendEmail, validateRequest, readFields, escapeHtml }
