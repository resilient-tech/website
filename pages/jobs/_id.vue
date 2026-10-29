<template>
  <main class="section container job">
    <NuxtLink to="/careers" class="job-back">
      <span class="arrow">←</span> All openings
    </NuxtLink>

    <header v-reveal class="job-head">
      <p class="label rise">Open role</p>
      <SplitText tag="h1" class="title" :text="job.title" />
      <p class="lead rise" style="--d: 0.3s">{{ job.about }}</p>
      <NuxtLink
        :to="`/jobs/apply?position=${job.id}`"
        class="btn btn-primary rise"
        style="--d: 0.4s"
      >
        Apply now <span class="arrow">→</span>
      </NuxtLink>
    </header>

    <section
      v-for="block in blocks"
      :key="block.title"
      v-reveal
      class="job-block rise"
    >
      <h2>{{ block.title }}</h2>
      <ul>
        <li v-for="item in block.items" :key="item">{{ item }}</li>
      </ul>
    </section>

    <div v-reveal class="job-apply rise">
      <p>Sounds like you?</p>
      <NuxtLink :to="`/jobs/apply?position=${job.id}`" class="btn btn-primary">
        Apply for this role <span class="arrow">→</span>
      </NuxtLink>
    </div>
  </main>
</template>

<script>
const lines = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

export default {
  head() {
    return {
      title: `${this.job.title} | Resilient Tech`,
    }
  },
  data() {
    return {
      job: this.$store.getters['jobs/getJob'](this.$route.params.id),
    }
  },
  computed: {
    blocks() {
      return [
        { title: 'Responsibilities and duties', items: lines(this.job.responsibilities) },
        { title: 'Required experience', items: lines(this.job.requiredExperience) },
        { title: 'Preferred experience', items: lines(this.job.preferredExperience) },
        { title: 'Technologies we use include', items: lines(this.job.technologies) },
        { title: 'Benefits', items: lines(this.job.benefits) },
      ]
    },
  },
}
</script>

<style scoped>
.job {
  max-width: 960px;
  padding-top: calc(var(--nav-h) + 72px);
}

.job-back {
  display: inline-flex;
  gap: 8px;
  margin-bottom: 56px;
  color: var(--muted);
  transition: color 0.3s;
}

.job-back:hover {
  color: var(--cream);
}

.job-back:hover .arrow {
  transform: translateX(-4px);
}

.job-head {
  padding-bottom: 72px;
}

.job-head .lead {
  margin-bottom: 36px;
}

.job-block {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
  gap: 16px 48px;
  padding: 40px 0;
  border-top: 1px solid var(--faint);
}

.job-block h2 {
  font-size: clamp(24px, 2.4vw, 32px);
}

.job-block li {
  position: relative;
  padding: 0 0 12px 24px;
  color: var(--muted);
}

.job-block li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.8em;
  width: 10px;
  height: 1px;
  background: var(--leaf);
}

.job-apply {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 48px 0 0;
  border-top: 1px solid var(--faint);
}

.job-apply p {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(28px, 3vw, 40px);
}

@media (max-width: 760px) {
  .job-block {
    grid-template-columns: 1fr;
  }
}
</style>
