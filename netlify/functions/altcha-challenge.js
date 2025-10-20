/**
 * ALTCHA Challenge Generator
 * Generates a cryptographic challenge for the ALTCHA widget
 *
 * Endpoint: /.netlify/functions/altcha-challenge
 */

const { createChallenge } = require('altcha-lib')

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

    // Generate challenge using official library
    const challenge = await createChallenge({
      hmacKey: secret,
      maxNumber: 100000, // Difficulty level
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
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
