const parser = require('lambda-multipart-parser')
const { sendEmail, readFields, escapeHtml } = require('../utils')
const { verifyAltchaPayload } = require('../altcha-utils')

const ALLOWED_ORIGINS = ['https://resilient.tech', 'https://www.resilient.tech']

// Presence + trim only; name/message uncapped (anything that could be real is accepted).
// Email keeps a loose format check plus the RFC 5321 254-char cap — that bound can never
// reject a valid address. The format check also guards against header injection into replyTo.
const FIELDS = {
  name: {},
  email: { email: true, max: 254 },
  message: {},
}

const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const reject = (msg) => ({ statusCode: 400, body: JSON.stringify({ error: msg }) })

  try {
    const origin = event.headers.origin || event.headers.referer || ''
    if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      console.warn('blocked origin:', origin)
      return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) }
    }

    const body = event.isBase64Encoded
      ? await parser.parse(event)
      : JSON.parse(event.body)

    // Fake success so bots learn nothing about what tripped them.
    const fakeOk = { statusCode: 200, body: JSON.stringify({ success: true }) }

    const { values, error } = readFields(body, FIELDS)
    if (error) return reject(error)

    if (!body.altchaPayload) return reject('Please complete the verification.')

    const verification = await verifyAltchaPayload(
      body.altchaPayload,
      process.env.ALTCHA_SECRET_KEY,
      origin.replace(/\/$/, '')
    )
    if (!verification.valid) {
      console.error('ALTCHA verification failed:', verification.error)
      // Bot-only signals (too quick / origin mismatch) -> fake success.
      // Genuine failures get a real error so humans can retry.
      if (verification.bot) return fakeOk
      return reject('Verification failed. Please try again.')
    }

    // Bot trap. The challenge carries a signed nonce; the frontend renders it into a
    // decoy hidden field named `csrf_token` (see ContactForm.vue) but the real submit
    // path never sends it back. A scraping bot that echoes "required" hidden fields will
    // return it. So: csrf_token present AND matching the signed nonce == bot -> fake
    // success, send nothing. A human never trips this because our client omits the field;
    // a wrong/absent value falls through to the normal path.
    if (verification.nonce && String(body.csrf_token || '') === verification.nonce) {
      console.warn('csrf_token bait tripped')
      return fakeOk
    }

    await sendEmail(
      `Resilient Tech <${process.env.GMAIL_SENDER}>`,
      process.env.CONTACT_US_RECIPIENTS,
      `Website Message from ${values.name}`,
      `
        Name: ${escapeHtml(values.name)} <br>
        Email: <a href="mailto:${encodeURIComponent(values.email)}">${escapeHtml(values.email)}</a><br><br>
        ${escapeHtml(values.message).replace(/\r?\n/g, '<br>')}<br>
      `,
      values.email
    )

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (error) {
    console.error('send-contact-inquiry failed:', error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Something went wrong.' }) }
  }
}

module.exports = { handler }
