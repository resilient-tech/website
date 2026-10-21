<template>
  <p class="lit">
    <template v-for="(word, i) in words">
      <span :key="i" :style="{ '--i': i }">{{ word }}</span>{{ ' ' }}
    </template>
  </p>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
  },

  computed: {
    words() {
      return this.text.split(/\s+/)
    },
  },

  mounted() {
    if (!document.documentElement.classList.contains('motion-ok')) return
    this.$el.classList.add('is-live')
    this.onScroll = () => {
      if (!this.frame) this.frame = requestAnimationFrame(this.update)
    }
    addEventListener('scroll', this.onScroll, { passive: true })
    addEventListener('resize', this.onScroll)
    this.update()
  },

  beforeDestroy() {
    removeEventListener('scroll', this.onScroll)
    removeEventListener('resize', this.onScroll)
    cancelAnimationFrame(this.frame)
  },

  methods: {
    // words light up while the paragraph travels from 85% to 35% of the screen
    update() {
      this.frame = 0
      const box = this.$el.getBoundingClientRect()
      const start = innerHeight * 0.85
      const end = innerHeight * 0.35 - box.height
      const progress = Math.min(1, Math.max(0, (start - box.top) / (start - end)))
      this.$el.style.setProperty('--lit', (progress * this.words.length).toFixed(2))
    },
  },
}
</script>

<style scoped>
.lit {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(30px, 4.4vw, 64px);
  font-weight: 350;
  line-height: 1.14;
  letter-spacing: -0.025em;
}

.lit.is-live span {
  opacity: calc(0.16 + 0.84 * clamp(0, var(--lit, 0) - var(--i), 1));
}
</style>
