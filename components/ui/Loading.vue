<template>
  <div class="loading" role="status" aria-label="Sending"><span /></div>
</template>

<style scoped>
.loading {
  padding: 8px 0;
}

.loading span {
  display: block;
  width: 26px;
  height: 26px;
  border: 2px solid var(--faint);
  border-top-color: var(--leaf);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
