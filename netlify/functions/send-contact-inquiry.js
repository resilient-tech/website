const parser = require('lambda-multipart-parser')
const { sendEmail, validateRequest } = require('../utils')

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
    await sendEmail(
      process.env.GMAIL_USER,
      process.env.CONTACT_US_RECIPIENTS,
      `New Inquiry From ${body.name}(${body.email})`,
      `
        Name: ${body.name} <br />
        Email: <a href="mailto:${body.email}">${body.email}</a><br />
        message: ${body.message}<br />
      `
    )

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
