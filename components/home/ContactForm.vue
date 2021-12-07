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
    <transition name="fade">
      <div class="alert error d-block" v-if="error">
        <span class="icon fa-check-circle"></span>
        {{ error }}
        <a class="close" @click.prevent="closErrorAlert">&times;</a>
      </div>
    </transition>
    <transition name="fade">
      <div class="alert success d-block" v-if="success">
        <span class="icon fa-check-circle"></span>
        Thanks for writing in! We'll contact you shortly.
        <a class="close" @click.prevent="closeSuccessAlert">&times;</a>
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
import { sendContactusInquiry } from '~/api/email.js'
export default {
  data() {
    return {
      success: false,
      isLoading: false,
      error: null,
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
    async onSubmit({ name, email, message }) {
      this.success = false
      this.error = null
      const form = this.$refs.contactForm
      if (!form.validate()) return
      this.isLoading = true
      try {
        const response = await sendContactusInquiry(name, email, message)
        console.log(response)
        form.reset()
        this.success = true
      } catch (e) {
        this.error =
          e.response?.data ?? 'Something went wrong, Please try again later!'
      } finally {
        this.isLoading = false
      }
    },

    closeSuccessAlert() {
      this.success = false
    },
    closeErrorAlert() {
      this.success = false
    },
  },
}
</script>
