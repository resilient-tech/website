<template>
  <main v-reveal class="section container thanks">
    <svg class="thanks-mark" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" />
      <path d="M20 33l8 8 16-17" />
    </svg>
    <SplitText
      tag="h1"
      class="title"
      text="Thank you for applying. We'll *connect* with you shortly."
    />
    <NuxtLink to="/" class="btn rise" style="--d: 0.5s">
      <span class="arrow">←</span> Back to home
    </NuxtLink>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: 'Thank you | Resilient Software Services LLP',
    }
  },
}
</script>

<style scoped>
.thanks {
  display: grid;
  justify-items: center;
  align-content: center;
  min-height: 86vh;
  text-align: center;
}

.thanks .title {
  max-width: 14em;
  margin-bottom: 40px;
}

.thanks-mark {
  width: 72px;
  margin-bottom: 40px;
  fill: none;
  stroke: var(--leaf);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.thanks-mark circle {
  stroke-dasharray: 190;
  stroke-dashoffset: 190;
  animation: draw 1.1s var(--ease) 0.1s forwards;
}

.thanks-mark path {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: draw 0.6s var(--ease) 0.9s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
