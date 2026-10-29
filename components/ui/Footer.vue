<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <NuxtLink
          v-reveal
          to="/"
          class="footer-logo"
          aria-label="Resilient Tech home"
        >
          <Logo />
        </NuxtLink>
        <p class="footer-note">
          Simple, yet powerful software experiences. Built on open source, in
          Vadodara.
        </p>
      </div>

      <div class="footer-bottom">
        <span>&copy; {{ year }} Resilient Software Services LLP</span>
        <ul class="footer-links">
          <li>
            <a href="https://github.com/resilient-tech" target="_blank" rel="noopener">GitHub</a>
          </li>
          <li>
            <a href="https://in.linkedin.com/company/resilient-tech" target="_blank" rel="noopener">LinkedIn</a>
          </li>
          <li><a href="mailto:info@resilient.tech">info@resilient.tech</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return { year: new Date().getFullYear() }
  },
}
</script>

<style scoped>
.footer {
  padding: clamp(72px, 10vw, 128px) 0 36px;
  border-top: 1px solid var(--faint);
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding-bottom: clamp(56px, 8vw, 96px);
}

.footer-logo {
  width: min(100%, 420px);
}

.footer-note {
  max-width: 22em;
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(20px, 2vw, 26px);
  line-height: 1.3;
  color: var(--muted);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px 32px;
  padding-top: 28px;
  border-top: 1px solid var(--faint);
  font-size: 14px;
  color: var(--muted);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
}

.footer-links a {
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--leaf);
}
</style>
