const { SESv2Client, SendEmailCommand } = require('@aws-sdk/client-sesv2')

// IAM user ses-sender may only send from @resilient.tech in ap-south-1.
// Credentials are passed explicitly: Netlify reserves the default AWS_* env var names.
const ses = new SESv2Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_ACCESS_KEY_SECRET,
  },
})

function sendEmail(from, to, subject, html, replyTo, attachments) {
  return ses.send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: to.split(',').map((s) => s.trim()).filter(Boolean) },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: { Html: { Data: html, Charset: 'UTF-8' } },
          Attachments: attachments?.length
            ? attachments.map((f) => ({
                FileName: f.filename,
                ContentType: f.contentType,
                ContentTransferEncoding: 'BASE64',
                RawContent: f.content, // Buffer; the SDK base64-encodes it
              }))
            : undefined,
        },
      },
    })
  ) // resolves to { MessageId }
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
