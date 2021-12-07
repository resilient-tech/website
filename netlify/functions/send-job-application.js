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
      process.env.GMAIL_USER,
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
      body.files
    )

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
