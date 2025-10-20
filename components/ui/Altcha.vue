<template>
  <!-- ALTCHA widget with production configuration -->
  <div class="altcha-container">
    <altcha-widget
      ref="altchaWidget"
      :debug="debug"
      :test="test"
      :challengeurl="challengeurl"
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
          // Focus submit button after verification
          this.$emit('verified')
        } else {
          this.internalValue = ''
        }
      }
    },
  },
}
</script>
