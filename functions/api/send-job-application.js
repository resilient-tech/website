const parser = require('lambda-multipart-parser')
const { sendEmail, validateRequest } = require('../utils')

export async function onRequestPost(request) {
  try {
    const body = request.isBase64Encoded
      ? await parser.parse(request)
      : JSON.parse(request.body)

    const error = validateRequest(body, [
      'name',
      'email',
      'phone',
      'position',
      'remote',
      'about',
      'projects',
      'files',
    ])
    if (error) {
      return { statusCode: 400, body: JSON.stringify(error) }
    }

    await sendEmail(
      `Resilient Tech <${process.env.GMAIL_SENDER}>`,
      process.env.JOB_APPLICATION_RECIPIENTS,
      `New resume for the postion ${body.position}`,
      `
        Name: ${body.name} <br />
        Email: <a href='mailto:${body.email}'>${body.email}</a><br />
        Phone:  <a href='tel:${body.phone}'>${body.phone}</a><br />
        Position: ${body.position}<br />
        Remote: ${body.remote}<br />
        About: ${body.about}<br />
        Projects: ${body.projects}<br />
        GitHub Profile: ${
          body.github
            ? '<a href="' + body.github + '">' + body.github + '</a>'
            : ''
        }<br />
      `,
      body.email,
      body.files
    )

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(error.toString(), { status: 500});
  }
}
