import axios from 'axios'

function sendContactusInquiry(name, email, message) {
  return axios
    .post(
      '/.netlify/functions/send-contact-inquiry',
      formDataFromObject({ name, email, message }),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .catch((error) => {
      if (error.response.data.includes('TimeoutError')) return
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
      if (error.response.data.includes('TimeoutError')) return
      throw error
    })
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
