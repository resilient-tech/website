const nodemailer = require('nodemailer')
const parser = require('lambda-multipart-parser')

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  try {
    const body = event.isBase64Encoded
      ? await parser.parse(event)
      : JSON.parse(event.body)

    const error = validateEmailRequest(body)
    if (error) {
      return { statusCode: 400, body: JSON.stringify({ error }) }
    }

    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })

    let info = await transporter.sendMail({
      from: 'info@resilient.tech',
      to: body.to,
      subject: body.subject,
      html: body.body,
      attachments: body.files,
    })
    // Log the result
    return { statusCode: 200, body: JSON.stringify(info) }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

function validateEmailRequest(body) {
  const requiredFields = ['to', 'body', 'subject']
  for (const key of requiredFields) {
    if (!(key in body)) {
      return `'${key}' is required, make sure you pass all of (${requiredFields}) in the request body!`
    }
  }
}

module.exports = { handler }
