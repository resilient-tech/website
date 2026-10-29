<template>
  <main>
    <section class="section container careers-hero">
      <div v-reveal>
        <p class="label rise">Careers</p>
        <SplitText
          tag="h1"
          class="careers-title"
          text="We’ve got an ambitious mission, but *together* we can achieve it."
        />
        <p class="lead rise" style="--d: 0.35s">
          Every person deserves the chance to learn regardless of where they
          are or their circumstances.
        </p>
        <a href="#openings" class="btn btn-primary rise" style="--d: 0.45s">
          View open positions <span class="arrow">↓</span>
        </a>
      </div>
    </section>

    <section id="openings" class="section container">
      <div v-reveal class="section-head">
        <p class="label rise">Open positions</p>
        <SplitText class="title" text="Current openings" />
      </div>
      <ul class="openings">
        <li v-for="job in jobs" :key="job.id" v-reveal class="rise">
          <NuxtLink :to="`/jobs/${job.id}`" class="opening">
            <h3>{{ job.title }}</h3>
            <p>{{ job.about }}</p>
            <span class="opening-cta">View role <span class="arrow">→</span></span>
          </NuxtLink>
        </li>
      </ul>
      <p v-if="!jobs.length" class="lead">
        No openings right now. Write to
        <a href="mailto:info@resilient.tech" class="link">info@resilient.tech</a>
        and tell us what you'd like to work on.
      </p>
    </section>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: 'Careers | Resilient Software Services LLP',
    }
  },
  computed: {
    jobs() {
      return this.$store.state.jobs.jobs
    },
  },
}
</script>

<style scoped>
.careers-hero {
  display: flex;
  align-items: flex-end;
  min-height: 92vh;
}

.careers-title {
  max-width: 13em;
  margin-bottom: 36px;
  font-size: clamp(44px, 6.8vw, 104px);
  font-weight: 350;
  letter-spacing: -0.035em;
}

.careers-hero .lead {
  margin-bottom: 40px;
}

.openings {
  border-bottom: 1px solid var(--faint);
}

.opening {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) auto;
  gap: 16px 48px;
  align-items: baseline;
  padding: 40px 0;
  border-top: 1px solid var(--faint);
  transition: padding 0.5s var(--ease), background-color 0.5s;
}

.opening:hover {
  padding-inline: 20px;
  background: var(--ink-2);
}

.opening h3 {
  font-size: clamp(26px, 2.6vw, 38px);
}

.opening p {
  margin: 0;
  color: var(--muted);
}

.opening-cta {
  font-weight: 500;
  white-space: nowrap;
  color: var(--leaf);
}

@media (max-width: 860px) {
  .opening {
    grid-template-columns: 1fr;
  }
}
</style>
