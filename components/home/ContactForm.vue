<template>
  <div>
    <Form
      method="POST"
      formClass="contact-us"
      :formFields="formFields"
      :isLoading="isLoading"
      submitLabel="Send Message"
      @submit="onSubmit"
      ref="contactForm"
    />
    <transition>
      <div class="alert success d-block" v-if="success">
        <span class="icon fa-check-circle"></span>
        Thanks for writing in! We'll contact you shortly.
        <a class="close" @click.prevent="closeSuccessMessage">&times;</a>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.close {
  cursor: pointer;
  font-size: 1.8rem;
  margin: 0;
  padding: 0;
  right: 1rem;
}
</style>

<script>
export default {
  data() {
    return {
      success: false,
      isLoading: false,
    }
  },
  computed: {
    formFields() {
      return {
        name: {
          label: 'Name',
          required: true,
          fieldClass: 'half',
        },
        email: {
          label: 'Email',
          required: true,
          type: 'email',
          fieldClass: 'half',
          validate(value) {
            if (value && !$nuxt.$validateEmail(value))
              return 'Invalid Email Address!'
          },
        },
        message: {
          label: 'Message',
          required: true,
          type: 'textarea',
          rows: 5,
        },
      }
    },
  },
  methods: {
    async onSubmit(data) {
      const form = this.$refs.contactForm
      if (!form.validate()) return
      this.success = false
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.isLoading = false
      this.success = true
      // RESET Form
      form.reset()
      return
      const formData = new FormData()
      formData.append(
        'subject',
        `New contact form (resilient.tech) submission from ${this.name}(${this.email})`
      )
      formData.append('to', 'pruthvi@resilient.tech')
      formData.append('body', this.generateEmailBody())

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
        Email: <a href="mailto:${this.email}">${this.email}</a>
        message: ${this.message}
		  `
    },

    closeSuccessMessage() {
      this.success = false
    },
  },
}
</script>
