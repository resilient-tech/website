<template>
  <div class="text-center">
    <i class="fa fa-spinner loading" aria-hidden="true"></i>
  </div>
</template>

<style scoped>
.loading {
  font-size: 1.5em;
  animation: circle 1.5s linear infinite;
}

@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>