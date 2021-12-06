<template>
  <div>
    <section id="apply" class="card bg-dark fade-up mt-5 py-5">
      <div class="m-auto col-10 col-lg-8 mt-5">
        <h1>Job Application</h1>
        <p>We'd love to have you on our team! Tell us more about yourself.</p>
        <div class="style1">
          <Form
            method="POST"
            formClass="contact-us"
            :formFields="formFields"
            :isLoading="isLoading"
            submitLabel="SUBMIT"
            @submit="onSubmit"
            ref="jobApplicationForm"
          />
          <transition name="fade">
            <div class="alert error d-block" v-if="error">
              <span class="icon fa-check-circle"></span>
              {{ error }}
              <a class="close" @click.prevent="closeErrorAlert">&times;</a>
            </div>
          </transition>
        </div>
      </div>
      <a @click="back" aria-hidden="true" class="page-close">&times;</a>
    </section>
  </div>
</template>

<script>
import sendEmail from '~/api/email.js'

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    openPositions() {
      return this.$store.state.jobs.jobs.map((job) => job.title)
    },

    defaultPostion() {
      const position = this.$store.state.jobs.jobs.find(
        (j) => j.id.toString() == this.$route.query.position
      )
      return position?.title || ''
    },
    formFields() {
      return {
        name: {
          label: 'Full Name',
          required: true,
        },
        email: {
          label: 'Email Address',
          required: true,
          type: 'email',
          validate(value) {
            if (value && !$nuxt.$validateEmail(value))
              return 'Invalid Email Address!'
          },
        },
        phone: {
          label: 'Contact Number',
          required: true,
          validate(value) {
            if (value && !$nuxt.$validatePhone(value))
              return 'Invalid Phone Number!'
          },
        },
        position: {
          label: 'Position',
          required: true,
          type: 'select',
          value: this.defaultPostion || '',
          options: this.openPositions,
        },
        remote: {
          label: 'Remote',
          type: 'checkbox',
          value: false,
        },
        github: {
          label: 'GitHub Profile',
          placeholder: 'https://github.com/username',
          type: 'text',
          validate(value) {
            if (
              value &&
              (!$nuxt.$validateUrl(value) || !value.includes('github.com'))
            )
              return 'Invalid URL!'
          },
        },
        resume: {
          label: 'Resume',
          type: 'file',
          required: true,
          accept: '.pdf, .doc, .docx',
          validate(value) {
            if (value && !/(\.(pdf|doc|docx))$/.test(value.name)) {
              return 'Please choose a .pdf, .doc or .docx file'
            }
          },
        },
        about: {
          label: 'Tell us about yourself',
          type: 'textarea',
          required: true,
        },
        projects: {
          label: "Tell us something cool you've worked on",
          type: 'textarea',
          required: true,
        },
      }
    },
  },
  methods: {
    async onSubmit(data) {
      this.error = null
      const form = this.$refs.jobApplicationForm
      if (!form.validate()) return
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))

      try {
        await sendEmail(
          'pruthvi@resilient.tech,sagar@resilient.tech,info@resilient.tech',
          `New resume for the postion ${data.position}`,
          this.generateEmailBody(data),
          data.resume
        )
        form.reset()
        this.$router.push('/thank-you')
      } catch (e) {
        console.log(e)
        this.error = 'Something went wrong, Please try again later!'
      } finally {
        this.isLoading = false
      }
    },

    generateEmailBody(data) {
      return `
        Name: ${data.name} <br />
        Email: <a href='mailto:${data.email}'>${data.email}</a><br />
        Phone:  <a href='tel:${data.phone}'>${data.phone}</a><br />
        Position: ${data.position}<br />
        Remote: ${data.remote}<br />
        About: ${data.about}<br />
        Projects: ${data.projects}<br />
        GitHub Profile: ${
          data.github
            ? '<a href="' + data.github + '">' + data.github + '</a>'
            : ''
        }<br />
      `
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    closeErrorAlert() {
      this.success = false
    },
  },
}
</script>
