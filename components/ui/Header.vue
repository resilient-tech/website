<template>
  <header class="nav" :class="{ 'is-solid': solid, 'is-tucked': tucked }">
    <div class="nav-inner container">
      <NuxtLink to="/" class="nav-logo" aria-label="Resilient Tech home">
        <Logo />
      </NuxtLink>
      <nav class="nav-links" aria-label="Main">
        <a v-for="link in links" :key="link.href" :href="link.href">
          {{ link.title }}
        </a>
      </nav>
      <a :href="`${base}#contact`" class="btn btn-small nav-cta">
        Get in touch <span class="arrow">→</span>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return { solid: false, tucked: false, lastY: 0 }
  },

  computed: {
    base() {
      return this.$route.path === '/' ? '' : '/'
    },
    links() {
      return [
        { title: 'ERPNext', href: `${this.base}#erpnext` },
        { title: 'Services', href: `${this.base}#services` },
        { title: 'Open source', href: `${this.base}#open-source` },
      ]
    },
  },

  mounted() {
    this.onScroll = () => {
      if (!this.frame) this.frame = requestAnimationFrame(this.update)
    }
    addEventListener('scroll', this.onScroll, { passive: true })
    this.update()
  },

  beforeDestroy() {
    removeEventListener('scroll', this.onScroll)
    cancelAnimationFrame(this.frame)
  },

  methods: {
    update() {
      this.frame = 0
      const y = scrollY
      this.solid = y > 24
      // tuck away while reading down, come back on any scroll up
      if (y > 600 && y > this.lastY + 4) this.tucked = true
      else if (y < this.lastY - 4) this.tucked = false
      this.lastY = y
    },
  },
}
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  height: var(--nav-h);
  border-bottom: 1px solid transparent;
  transition: transform 0.5s var(--ease), background-color 0.4s, border-color 0.4s;
}

.nav.is-solid {
  background: rgba(13, 20, 17, 0.78);
  border-color: var(--faint);
  backdrop-filter: blur(14px) saturate(140%);
}

.nav.is-tucked {
  transform: translateY(-100%);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
}

.nav-logo {
  width: 124px;
  transition: opacity 0.5s var(--ease), translate 0.5s var(--ease);
}

.nav-links {
  display: flex;
  gap: 36px;
  margin-left: auto;
  font-size: 15px;
}

.nav-links a {
  position: relative;
  color: var(--muted);
  transition: color 0.3s;
}

.nav-links a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 1px;
  background: var(--leaf);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.45s var(--ease);
}

.nav-links a:hover {
  color: var(--cream);
}

.nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

@media (max-width: 760px) {
  .nav-links {
    display: none;
  }
}
</style>
