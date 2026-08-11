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
    >
      <template #after-fields>
        <!--
          Bait field. Looks like ordinary anti-CSRF plumbing, so a scraping bot that
          echoes "required" hidden fields will send it back. The real submit handler
          (onSubmit) deliberately does NOT include it, so a genuine visitor never sends
          it. The server treats csrf_token coming back == bot. Do not wire this into the
          submitted payload. See netlify/functions/send-contact-inquiry.js (nonce trap).
        -->
        <input type="hidden" name="csrf_token" :value="csrfToken" />
        <Altcha
          :payload.sync="altchaPayload"
          :challengeurl="challengeUrl"
          @verified="onVerified"
        />
      </template>
    </Form>
    <transition name="fade">
      <div class="alert error d-block" v-if="error">
        <span class="icon fa-exclamation-circle"></span>
        {{ error }}
        <a class="close" @click.prevent="closeErrorAlert">&times;</a>
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
      altchaPayload: '',
      challengeIssuedAt: null, // ms epoch, from signed `iat`
      csrfToken: '', // bait nonce rendered into a decoy hidden field; never submitted
      // ALTCHA challenge endpoint
      challengeUrl: '/.netlify/functions/altcha-challenge',
    }
  },
  // Server floor is MIN_DWELL_MS (3500) in netlify/altcha-utils.js; hold slightly longer
  // so inter-instance clock skew never lands a genuine request under the server floor.
  CLIENT_DWELL_MS: 4000,
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

      // Validate ALTCHA payload
      if (!this.altchaPayload) {
        this.error = 'Please complete the verification.'
        return
      }

      this.isLoading = true
      try {
        // Hold the request to the server's min-dwell so a genuine fast submit is
        // throttled (feels slightly slow) rather than rejected as "too quick".
        await this.waitForDwell()
        // NB: csrfToken (the bait nonce) is intentionally NOT passed. Sending it would
        // trip the server's bot trap. Only a scraping bot echoes the decoy field.
        await sendContactusInquiry(name, email, message, this.altchaPayload)
        form.reset()
        this.altchaPayload = '' // Reset ALTCHA
        this.challengeIssuedAt = null
        this.csrfToken = ''
        this.success = true
      } catch (e) {
        this.error =
          e.response?.data?.error ?? 'Something went wrong, Please try again later!'
      } finally {
        this.isLoading = false
      }
    },

    onVerified({ issuedAt, nonce }) {
      this.challengeIssuedAt = issuedAt
      this.csrfToken = nonce // fills the bait field; onSubmit never forwards it
    },

    waitForDwell() {
      if (!this.challengeIssuedAt) return Promise.resolve()
      const remaining =
        this.$options.CLIENT_DWELL_MS - (Date.now() - this.challengeIssuedAt)
      if (remaining <= 0) return Promise.resolve()
      return new Promise((resolve) => setTimeout(resolve, remaining))
    },

    closeSuccessAlert() {
      this.success = false
    },
    closeErrorAlert() {
      this.error = null
    },
  },
}
</script>
