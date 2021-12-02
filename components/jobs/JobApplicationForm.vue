<template>
  <div>
    <section id="apply" class="card bg-dark fade-up mt-5 py-5">
      <h1 class="text-center"><Logo class="mt-5" /></h1>
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
        </div>
      </div>
      <a @click="back" aria-hidden="true" class="page-close">&times;</a>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    openPositions() {
      return this.$store.state.jobs.jobs.map((job) => job.title)
    },

    defaultPostion() {
      return this.$store.state.jobs.jobs.find((j) => j.id == 1).title
    },
    formFields() {
      return {
        name: {
          label: 'Full Name',
          required: true,
          value: 'Pruthvi Patel',
        },
        email: {
          label: 'Email Address',
          required: true,
          value: 'test@test.com',
          type: 'email',
          validate(value) {
            if (value && !$nuxt.$validateEmail(value))
              return 'Invalid Email Address!'
          },
        },
        phone: {
          label: 'Contact Number',
          required: true,
          value: '8347248341',

          validate(value) {
            if (value && !$nuxt.$validatePhone(value))
              return 'Invalid Phone Number!'
          },
        },
        position: {
          label: 'Position',
          required: true,
          type: 'select',
          value:
            this.$store.state.jobs.jobs.find(
              (j) => j.id == this.$route.query.position
            ).title || '',
          options: this.$store.state.jobs.jobs.map((job) => job.title),
        },
        remote: {
          label: 'Remote',
          type: 'checkbox',
          value: true,
        },
        github: {
          label: 'GitHub Profile',
          placeholder: 'https://github.com/username',
          type: 'text',
          value: 'https://github.com/pruthvi145',
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
          value: 'Python Developer',
          required: true,
        },
        projects: {
          label: "Tell us something cool you've worked on",
          type: 'textarea',
          value: 'Amazing projects',
          required: true,
        },
      }
    },
  },
  methods: {
    async onSubmit(data) {
      const form = this.$refs.jobApplicationForm
      if (!form.validate()) return
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.isLoading = false
      form.reset()
      this.$router.push('/thank-you')
      return

      const formData = new FormData()
      formData.append('subject', `New resume for the postion ${position}`)
      formData.append('to', 'pruthvi@resilient.tech')
      formData.append('body', this.generateEmailBody())
      formData.append('attachments', this.file)

      try {
        await this.$axios.post(
          'https://resilient-tech-364ab0.netlify.live/send-email',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        this.success = true
      } catch (e) {
        this.errors.push(e)
      } finally {
        this.isLoading = false
      }
    },

    generateEmailBody() {
      return `
        Name: ${this.name}
        Email: <a href='mailto:${this.email}'>${this.email}</a>
        Phone:  <a href='tel:${this.phone}'>${this.phone}</a>
        Position: ${this.position}
        Remote: ${this.remote}
        About: ${this.about}
        Projects: ${this.projects}
        GitHub Profile: ${
          this.github
            ? '<a href="' + this.github + '">' + this.github + '</a>'
            : ''
        }
      `
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
}
</script>
