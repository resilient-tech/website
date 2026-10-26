const parser = require('lambda-multipart-parser')
const { sendEmail, validateRequest, escapeHtml } = require('../utils')

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
      `Resilient Tech <${process.env.MAIL_SENDER}>`,
      process.env.JOB_APPLICATION_RECIPIENTS,
      `New resume for the postion ${escapeHtml(body.position)}`,
      `
        Name: ${escapeHtml(body.name)} <br />
        Email: <a href='mailto:${encodeURIComponent(body.email)}'>${escapeHtml(body.email)}</a><br />
        Phone:  <a href='tel:${encodeURIComponent(body.phone)}'>${escapeHtml(body.phone)}</a><br />
        Position: ${escapeHtml(body.position)}<br />
        Remote: ${escapeHtml(body.remote)}<br />
        About: ${escapeHtml(body.about)}<br />
        Projects: ${escapeHtml(body.projects)}<br />
        GitHub Profile: ${
          body.github
            ? '<a href="' + encodeURIComponent(body.github) + '">' + escapeHtml(body.github) + '</a>'
            : ''
        }<br />
      `,
      body.email,
      body.files
    )

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (error) {
    console.error('send-job-application failed:', error)
    return {
      statusCode: 500,
      body: JSON.stringify('Something went wrong.'),
    }
  }
}

module.exports = { handler }
