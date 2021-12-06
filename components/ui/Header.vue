<template>
  <header class="text-center">
    <div class="banner" v-if="showBanner">
      <div class="banner-text">
        We're hiring, <NuxtLink to="/careers">Apply now!</NuxtLink>
      </div>
    </div>
    <h2><Logo class="logo" /></h2>
  </header>
</template>

<style scoped>
header {
  display: none;
}
@media screen and (max-width: 1280px) {
  header {
    display: block;
  }
}

.banner {
  text-align: center;
  background: #182127;
}

.banner-text {
  padding: 0.7rem 0;
}
.logo {
  margin-top: 1.2rem;
}
</style>
<script>
export default {
  computed: {
    showBanner() {
      return this.$route.path === '/'
    },
  },
}
</script>
