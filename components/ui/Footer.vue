<template>
  <footer id="footer" class="wrapper style1">
    <div class="inner text-center w-100">
      <ul class="menu">
        <li>
          &copy; {{ currentYear }} <NuxtLink to="/">Resilient Tech</NuxtLink>.
          All rights reserved.
        </li>
        <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
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