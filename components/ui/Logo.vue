<template>
  <img
    src="~/assets/images/logo_white.png"
    alt="Resilient Tech"
    id="logo"
    :height="height"
  />
</template>

<script>
export default {
  props: ['height'],
}
</script>