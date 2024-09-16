<template>
  <footer id="footer" class="wrapper style1">
    <div class="inner text-center w-100">
      <ul class="menu">
        <li>
          &copy; {{ currentYear }} <NuxtLink to="/">Resilient Software Services LLP</NuxtLink>.
          All rights reserved.
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  data() {
    return { currentYear: new Date().getFullYear() }
  },
}
</script>