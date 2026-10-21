<template>
  <section id="intro" class="intro">
    <div class="intro-stage">
      <svg
        class="intro-wind"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          v-for="(d, i) in streaks"
          :key="i"
          :d="d"
          :class="{ idle: i < 2 }"
          :style="{ '--n': i }"
        />
      </svg>

      <div class="intro-mark">
        <Logo class="intro-logo" />
        <p class="intro-tagline">
          We inspire business growth with simple, yet powerful software
          experiences.
        </p>
      </div>

      <div class="intro-hero container" :class="{ 'is-in': revealed }">
        <p class="label rise">ERPNext &amp; Frappe specialists · Vadodara, India</p>
        <SplitText
          tag="h1"
          class="intro-title"
          text="Business software, built on open source and built to *last.*"
        />
        <div class="intro-foot">
          <p class="intro-sub rise" style="--d: 0.35s">
            We set up, customise, integrate and support ERPNext for growing
            businesses. We also build India Compliance, the open-source GST app
            for ERPNext.
          </p>
          <div class="intro-actions rise" style="--d: 0.45s">
            <a href="#contact" class="btn btn-primary">
              Start a project <span class="arrow">→</span>
            </a>
            <a href="#services" class="btn">What we do</a>
          </div>
        </div>
      </div>

      <div class="intro-cue" aria-hidden="true"><span>Scroll</span><i /></div>
    </div>
  </section>
</template>

<script>
const clamp = (value, low, high) => Math.min(high, Math.max(low, value))

// same seed, same gust, every visit
function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

// one leaf or letter riding the wind; t runs 0 to 1 over its own slice of the scroll
class FlyingPiece {
  constructor(el, index) {
    const rand = seeded(index * 7919 + 101)
    const across = parseFloat(el.style.left) / 100
    const isLeaf = el.classList.contains('is-leaf')
    const isTech = el.classList.contains('is-tech')

    this.el = el
    // leaves catch the wind first; letters then peel off from the right end so none pile up
    this.start = isLeaf ? 0.01 + rand() * 0.05 : 0.08 + (1 - across) * 0.28 + (isTech ? -0.04 : 0)
    this.span = isLeaf ? 0.55 : 0.34
    this.driftX = 0.7 + rand() * 0.6
    this.lift = (isLeaf ? 0.32 : 0.28) + rand() * 0.4
    this.flutter = (isLeaf ? 48 : 22) * (0.6 + rand() * 0.8)
    this.waves = 1.5 + rand() * 2.5
    this.spin = (isLeaf ? 140 + rand() * 120 : 50 + rand() * 200) * (rand() > 0.3 ? 1 : -1)
    this.flips = isLeaf ? 2 + rand() * 2 : 0
    this.grow = isLeaf ? 0 : rand() * 0.5 - 0.2
  }

  place(progress, width, height) {
    const t = clamp((progress - this.start) / this.span, 0, 1)
    if (t === 0) return this.rest()

    const gust = Math.pow(t, 1.7)
    const x = gust * width * this.driftX
    const y =
      -Math.pow(t, 1.2) * height * this.lift +
      Math.sin(t * Math.PI * this.waves) * this.flutter * t
    // letters shiver loose before they lift
    const shiver = Math.sin(t * 38) * 5 * Math.max(0, 1 - t * 4)
    const turn = gust * this.spin + shiver
    // leaves tumble edge-on
    const flip = this.flips ? Math.cos(t * Math.PI * this.flips) : 1
    const scale = 1 + this.grow * t
    const fade = clamp((t - 0.5) / 0.5, 0, 1)

    this.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${turn}deg) scale(${scale}, ${scale * flip})`
    this.el.style.opacity = 1 - fade * fade * (3 - 2 * fade)
  }

  rest() {
    this.el.style.transform = ''
    this.el.style.opacity = ''
  }
}

// ties page scroll to the gust; one frame per scroll burst
class WindScene {
  constructor(root, onProgress) {
    this.root = root
    this.onProgress = onProgress
    this.pieces = [...root.querySelectorAll('.logo-piece')].map(
      (el, i) => new FlyingPiece(el, i)
    )
    this.frame = 0
    this.schedule = () => {
      if (!this.frame) this.frame = requestAnimationFrame(() => this.render())
    }
  }

  start() {
    addEventListener('scroll', this.schedule, { passive: true })
    addEventListener('resize', this.schedule)
    this.render()
  }

  stop() {
    removeEventListener('scroll', this.schedule)
    removeEventListener('resize', this.schedule)
    cancelAnimationFrame(this.frame)
  }

  progress() {
    const box = this.root.getBoundingClientRect()
    const travel = box.height - innerHeight
    return travel > 0 ? clamp(-box.top / travel, 0, 1) : 0
  }

  render() {
    this.frame = 0
    const p = this.progress()
    this.root.style.setProperty('--p', p.toFixed(4))
    for (const piece of this.pieces) piece.place(p, innerWidth, innerHeight)
    this.onProgress(p)
  }
}

const streak = (y) =>
  `M-200 ${y} C 240 ${y - 70}, 620 ${y + 60}, 980 ${y - 10} S 1500 ${y + 40}, 1700 ${y - 20}`

export default {
  data() {
    return {
      revealed: false,
      streaks: [330, 560, 170, 280, 420, 520, 650, 760].map(streak),
    }
  },

  mounted() {
    if (!document.documentElement.classList.contains('motion-ok')) {
      this.revealed = true
      return
    }
    this.scene = new WindScene(this.$el, (p) => this.onProgress(p))
    this.scene.start()
  },

  beforeDestroy() {
    if (this.scene) this.scene.stop()
    document.documentElement.classList.remove('intro-passed')
  },

  methods: {
    onProgress(p) {
      this.revealed = p > 0.56
      document.documentElement.classList.toggle('intro-passed', this.revealed)
    },
  },
}
</script>

<style>
.intro-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14vh;
  min-height: 100svh;
  padding: calc(var(--nav-h) + 48px) 0 96px;
}

.intro-mark {
  display: grid;
  justify-items: center;
  gap: 32px;
  padding-inline: var(--gutter);
}

.intro-logo {
  width: min(84vw, 920px);
}

.intro-tagline {
  max-width: 30em;
  margin: 0;
  text-align: center;
  font-size: clamp(15px, 1.35vw, 18px);
  color: var(--muted);
}

.intro-title {
  max-width: 11.5em;
  margin-bottom: clamp(32px, 5vh, 56px);
  font-size: clamp(44px, 7.6vw, 116px);
  font-weight: 350;
  letter-spacing: -0.035em;
}

.intro-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px 48px;
}

.intro-sub {
  max-width: 30em;
  margin: 0;
  font-size: clamp(16px, 1.3vw, 19px);
  color: var(--muted);
}

.intro-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.intro-wind,
.intro-cue {
  display: none;
}

/* scroll-driven version; without motion-ok the intro is a plain stacked hero */
.motion-ok .intro {
  height: 230vh;
}

.motion-ok .intro-stage {
  position: sticky;
  top: 0;
  display: block;
  height: 100vh;
  height: 100svh;
  min-height: 0;
  padding: 0;
  overflow: hidden;
}

.motion-ok .intro-mark {
  position: absolute;
  inset: 0;
  z-index: 2;
  align-content: center;
  pointer-events: none;
}

.motion-ok .intro-hero {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: var(--nav-h);
}

.motion-ok .intro-hero:not(.is-in) {
  pointer-events: none;
}

.motion-ok .intro-logo .logo-piece {
  animation: piece-in 1.1s var(--ease) backwards;
  animation-delay: calc(0.35s + var(--k) * 45ms);
}

.motion-ok .intro-logo .logo-piece.is-leaf {
  animation: leaf-in 1.5s var(--ease) 0.1s backwards, sway 5.2s ease-in-out 1.6s infinite;
}

.motion-ok .intro-logo .logo-piece.is-leaf + .logo-piece.is-leaf {
  animation-duration: 1.5s, 4.1s;
  animation-delay: 0.25s, 1.75s;
}

.motion-ok .intro-tagline {
  opacity: calc(1 - var(--p, 0) * 5);
  translate: 0 calc(var(--p, 0) * -80px);
  animation: tagline-in 1s var(--ease) 1.1s backwards;
}

.motion-ok .intro-wind {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.intro-wind path {
  fill: none;
  stroke: var(--cream);
  stroke-width: 1;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 240 3200;
  stroke-dashoffset: calc(2400px - var(--p, 0) * (3400px + var(--n) * 260px));
  opacity: calc(min(var(--p, 0) * 6, 1) * (1 - var(--p, 0)) * 0.45);
}

/* a light breeze before anyone scrolls */
.intro-wind path.idle {
  stroke-dasharray: 160 3400;
  opacity: calc(0.2 * (1 - min(var(--p, 0) * 6, 1)));
  animation: breeze 9s linear infinite;
  animation-delay: calc(var(--n) * -4.5s);
}

.motion-ok .intro-cue {
  position: absolute;
  left: 50%;
  bottom: 30px;
  display: grid;
  justify-items: center;
  gap: 12px;
  translate: -50% 0;
  font: 500 11px/1 var(--mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: calc(1 - var(--p, 0) * 8);
}

.intro-cue i {
  width: 1px;
  height: 46px;
  background: linear-gradient(var(--cream), transparent);
  transform-origin: top;
  animation: cue 2.4s var(--ease) infinite;
}

@keyframes piece-in {
  from {
    translate: 0 40%;
    opacity: 0;
  }
}

@keyframes leaf-in {
  from {
    translate: -70px 30px;
    rotate: -24deg;
    opacity: 0;
  }
}

@keyframes sway {
  0%,
  100% {
    rotate: 0deg;
  }
  35% {
    rotate: 3.5deg;
  }
  70% {
    rotate: -2deg;
  }
}

@keyframes tagline-in {
  from {
    opacity: 0;
    translate: 0 14px;
  }
}

@keyframes breeze {
  from {
    stroke-dashoffset: 3560px;
  }
  to {
    stroke-dashoffset: 0px;
  }
}

@keyframes cue {
  0% {
    transform: scaleY(0);
    opacity: 1;
  }
  55% {
    transform: scaleY(1);
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    opacity: 0;
  }
}
</style>
