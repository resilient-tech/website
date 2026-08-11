import axios from 'axios'

function sendContactusInquiry(name, email, message, altchaPayload = null) {
  const data = { name, email, message }

  // validated in contact form
  if (altchaPayload) {
    data.altchaPayload = altchaPayload
  }

  return axios
    .post(
      '/.netlify/functions/send-contact-inquiry',
      formDataFromObject(data),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .catch((error) => {
      if (isTimeout(error)) return
      throw error
    })
}

function sendJobApplication(jobApplication) {
  return axios
    .post(
      '/.netlify/functions/send-job-application',
      formDataFromObject(jobApplication),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .catch((error) => {
      if (isTimeout(error)) return
      throw error
    })
}

// Server may return a raw string (legacy) or a JSON error object; handle both.
function isTimeout(error) {
  const data = error.response?.data
  const text = typeof data === 'string' ? data : JSON.stringify(data ?? '')
  return text.includes('TimeoutError')
}

function formDataFromObject(object) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(object)) {
    if (value == null) continue
    formData.append(key, value)
  }
  return formData
}

export { sendContactusInquiry, sendJobApplication }
