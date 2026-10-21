<template>
  <section id="apply" v-reveal class="apply-card">
    <button type="button" class="page-close" aria-label="Go back" @click="back">
      &times;
    </button>
    <p class="label rise">Job application</p>
    <SplitText tag="h1" class="title" text="We'd love to have you on our *team.*" />
    <p class="lead rise" style="--d: 0.3s">Tell us more about yourself.</p>
    <Form
      method="POST"
      formClass="contact-us"
      :formFields="formFields"
      :isLoading="isLoading"
      submitLabel="Send application"
      @submit="onSubmit"
      ref="jobApplicationForm"
    />
    <transition name="fade">
      <div class="alert error" role="alert" v-if="error">
        {{ error }}
        <button type="button" class="close" aria-label="Dismiss" @click="closeErrorAlert">&times;</button>
      </div>
    </transition>
  </section>
</template>

<script>
import { sendJobApplication } from '~/api/email.js'

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

            if (
              value &&
              parseFloat((value.size / 1024 / 1024).toFixed(4)) > 10
            ) {
              return 'File size should be less than 10MB!'
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
    async onSubmit(values) {
      this.error = null
      const form = this.$refs.jobApplicationForm
      if (!form.validate()) return
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))

      try {
        await sendJobApplication(values)
        form.reset()
        this.$router.push('/thank-you')
      } catch (e) {
        this.error =
          (e.response && e.response.data) ??
          'Something went wrong, Please try again later!'
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
      this.error = null
    },
  },
}
</script>

<style scoped>
.apply-card {
  position: relative;
  padding: clamp(28px, 5vw, 64px);
  border: 1px solid var(--faint);
  border-radius: 28px;
  background: var(--ink-2);
}

.apply-card .lead {
  margin-bottom: 48px;
}

.page-close {
  position: absolute;
  top: 20px;
  right: 24px;
  border: 0;
  background: none;
  color: var(--muted);
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.3s, rotate 0.4s var(--ease);
}

.page-close:hover {
  color: var(--cream);
  rotate: 90deg;
}
</style>
