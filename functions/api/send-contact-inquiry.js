const parser = require('lambda-multipart-parser')
const { sendEmail, validateRequest } = require('../utils')

export async function onRequestPost(request) {
  try {
    const body = request.isBase64Encoded
      ? await parser.parse(request)
      : JSON.parse(request.body)

    const error = validateRequest(body, ['name', 'email', 'message'])
    if (error) {
      return { statusCode: 400, body: JSON.stringify(error) }
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

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(error.toString(), { status: 500});
  }
}
