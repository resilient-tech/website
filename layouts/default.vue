<template>
  <div class="site">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
// runs before first paint so hidden-until-revealed content never flashes
const MOTION_CHECK = `if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('motion-ok')`

export default {
  head() {
    return {
      script: [{ hid: 'motion-check', innerHTML: MOTION_CHECK }],
      __dangerouslyDisableSanitizersByTagID: { 'motion-check': ['innerHTML'] },
    }
  },
}
</script>
