<template>
  <!-- ALTCHA widget with production configuration -->
  <div class="altcha-container">
    <altcha-widget
      ref="altchaWidget"
      :debug="debug"
      :test="test"
      :challengeurl="challengeurl"
      :auto="auto"
    ></altcha-widget>
  </div>
</template>

<script>
export default {
  name: 'Altcha',
  props: {
    payload: {
      type: String,
      required: false,
      default: '',
    },
    challengeurl: {
      type: String,
      required: false,
      default: '', // Will use test mode if not provided
    },
    // 'onload' fetches + solves the challenge on mount, so the dwell clock (signed `iat`)
    // starts at page load. By the time a real user submits, the min-dwell has long passed
    // and the client hold is 0ms. Widget auto-refetches on expire (refetchonexpire default).
    auto: {
      type: String,
      default: 'onload',
    },
    test: {
      type: Boolean,
      default: false, // Set to true for testing without backend
    },
    debug: {
      type: Boolean,
      default: false, // Set to true to see debug info
    },
  },
  data() {
    return {
      internalValue: this.payload,
    }
  },
  watch: {
    internalValue(v) {
      this.$emit('update:payload', v || '')
    },
    // Keep widget in sync when the parent clears the payload (e.g. after submit),
    // otherwise a second submit re-sends the stale solved payload.
    payload(v) {
      if (v === this.internalValue) return
      this.internalValue = v
      if (!v && this.$refs.altchaWidget && this.$refs.altchaWidget.reset) {
        this.$refs.altchaWidget.reset()
      }
    },
  },
  mounted() {
    // Import altcha package to register the custom element
    if (process.client) {
      import('altcha').then(() => {
        if (this.$refs.altchaWidget) {
          this.$refs.altchaWidget.addEventListener(
            'statechange',
            this.onStateChange
          )
        }
      })
    }
  },
  beforeDestroy() {
    if (this.$refs.altchaWidget) {
      this.$refs.altchaWidget.removeEventListener(
        'statechange',
        this.onStateChange
      )
    }
  },
  methods: {
    onStateChange(ev) {
      if (ev && ev.detail) {
        const { payload, state } = ev.detail
        if (state === 'verified' && payload) {
          this.internalValue = payload
          // Emit signed params from the payload: `iat` lets the parent throttle to the
          // server min-dwell; `nonce` seeds the bait field (see ContactForm).
          this.$emit('verified', this.signedParams(payload))
        } else {
          this.internalValue = ''
        }
      }
    },

    // Decode the signed params folded into the payload's salt.
    signedParams(payload) {
      try {
        const { salt } = JSON.parse(atob(payload))
        const q = new URLSearchParams(salt.split('?')[1] || '')
        const iat = q.get('iat')
        return {
          issuedAt: iat ? parseInt(iat, 10) * 1000 : null,
          nonce: q.get('n') || '',
        }
      } catch (e) {
        return { issuedAt: null, nonce: '' }
      }
    },
  },
}
</script>
