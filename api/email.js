import axios from 'axios'

function sendEmail(to, subject, body, attachments) {
  const formData = new FormData()
  formData.append('to', to)
  formData.append('subject', subject)
  formData.append('body', body)
  formData.append('attachments', attachments)

  return axios
    .post('/.netlify/functions/send-email', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      if (error.response.data.includes('TimeoutError')) return
      throw error
    })
}

export default sendEmail
