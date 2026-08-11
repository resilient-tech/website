/**
 * ALTCHA Challenge Generator
 * Generates a cryptographic challenge for the ALTCHA widget
 *
 * Endpoint: /.netlify/functions/altcha-challenge
 */

const crypto = require('crypto')
const { createChallenge } = require('altcha-lib')

const ALLOWED_ORIGINS = ['https://resilient.tech', 'https://www.resilient.tech']
const isLocal = (origin) => /^http:\/\/localhost(:\d+)?$/.test(origin)

const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  try {
    const secret = process.env.ALTCHA_SECRET_KEY

    if (!secret) {
      console.error('ALTCHA_SECRET_KEY not configured')
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      }
    }

    const origin = event.headers.origin || ''
    if (origin && !ALLOWED_ORIGINS.includes(origin) && !isLocal(origin)) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) }
    }

    // Signed params fold into the salt and are covered by the challenge hash -> tamper-proof.
    //  iat: issue time (min-dwell / max-age)
    //  o:   origin (match on verify)
    //  n:   bait nonce. The frontend renders it into a decoy `csrf_token` hidden field
    //       (ContactForm.vue) that the real submit path never sends back. A bot that
    //       scrapes the form and echoes the "token" returns it -> caught server-side.
    const challenge = await createChallenge({
      hmacKey: secret,
      maxNumber: 100000, // Difficulty level
      expires: new Date(Date.now() + 1000 * 60 * 30), // 30 min; challenge is issued on page load (auto=onload)
      params: {
        iat: String(Math.floor(Date.now() / 1000)),
        o: origin || 'direct',
        n: crypto.randomBytes(12).toString('hex'),
      },
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        ...(origin ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}),
      },
      body: JSON.stringify(challenge)
    }
  } catch (error) {
    console.error('Error generating ALTCHA challenge:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate challenge' })
    }
  }
}

module.exports = { handler }
