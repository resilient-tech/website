const parser = require('lambda-multipart-parser')
const { sendEmail, validateRequest } = require('../utils')
const { verifyAltchaPayload } = require('../altcha-utils')

const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  try {
    const body = event.isBase64Encoded
      ? await parser.parse(event)
      : JSON.parse(event.body)

    const error = validateRequest(body, ['name', 'email', 'message'])
    if (error) {
      return { statusCode: 400, body: JSON.stringify(error) }
    }

    // Verify ALTCHA payload
    if (body.altchaPayload) {
      const verification = await verifyAltchaPayload(
        body.altchaPayload,
        process.env.ALTCHA_SECRET_KEY
      )

      if (!verification.valid) {
        console.error('ALTCHA verification failed:', verification.error)
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Verification failed. Please try again.' })
        }
      }
    } else {
      // If ALTCHA is not provided, reject the request
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Please complete the verification.' })
      }
    }
    await sendEmail(
      `Resilient Tech <${process.env.GMAIL_SENDER}>`,
      process.env.CONTACT_US_RECIPIENTS,
      `Website Message from ${body.name}`,
      `
        Name: ${body.name} <br>
        Email: <a href="mailto:${body.email}">${body.email}</a><br><br>
        ${body.message}<br>
      `,
      body.email
    )

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
