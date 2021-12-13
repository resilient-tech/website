const nodemailer = require('nodemailer')

function sendEmail(from, to, subject, html, replyTo, attachments) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    attachments,
    replyTo,
  })
}

function validateRequest(body, requiredFields) {
  for (const key of requiredFields) {
    if (!(key in body)) {
      return `'${key}' is required!`
    }
  }
}

module.exports = { sendEmail, validateRequest }
