<template>
  <div>
    <Sidebar
      :navItems="{
        Welcome: '#hero',
        'Our Values': '#ourValues',
        'Open Positions': '#openPositions',
      }"
    >
      <NuxtLink
        to="/"
        class="
          nuxt-link
          button
          fit
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <i
          class="fa fa-angle-left mb-1 me-2 prefix"
          style="font-size: 1.2rem; margin-bottom: 0.15rem"
        ></i>
        Go to Home
      </NuxtLink>
    </Sidebar>
    <div id="wrapper" class="careers-page">
      <section id="hero" class="wrapper style1 fullscreen align-center hero">
        <div class="inner">
          <h1 class="heading">
            We’ve got an ambitious mission,<br />
            but together we can achieve it.
          </h1>
          <p class="sub-heading">
            Every person deserves the chance to learn regardless of where they
            are or their circumstances.
          </p>
          <a href="#openPositions" class="button primary">
            VIEW OPEN POSITIONS
          </a>
        </div>
      </section>
      <section id="ourValues" class="wrapper style1 fade-up">
        <div class="inner">
          <h2 class="align-center">
            We <span class="icon fa-heart red"></span> Our Core Values
          </h2>
          <p class="">
            ERPNext is the modern, easy-to-use, 100% open source business
            management system used by thousands of enterprises worldwide. Here's
            why we love it:
          </p>
          <div class="features">
            <section>
              <span class="icon major fa-smile-o"></span>
              <h3>Simple</h3>
              <p>
                Business management software can be daunting. ERPNext keeps it
                simple and intuitive, making getting started a breeze.
              </p>
            </section>
            <section>
              <span class="icon major fa-laptop"></span>
              <h3>Web Based</h3>
              <p>
                ERPNext works irrespective of the device or platform you're
                using. Whether you're using a smartphone, or a laptop, it's
                easily accessible.
              </p>
            </section>
            <section>
              <span class="icon major fa-cloud"></span>
              <h3>Cloud Ready</h3>
              <p>
                Hosting your systems on the cloud gives you the satisfaction of
                knowing that your data will be safe, secure and accessible
                wherever you are.
              </p>
            </section>
            <section>
              <span class="icon major fa-list"></span>
              <h3>Comprehensive</h3>
              <p>
                Tired of using multiple applications for different purposes? No
                more. You can access everything you need at one place with
                ERPNext.
              </p>
            </section>
            <section>
              <span class="icon major fa-globe"></span>
              <h3>Open Source</h3>
              <p>
                Thousands of people worldwide (including us) contribute to
                ERPNext. This means better, well-tested, and more secure
                software for everyone.
              </p>
            </section>
            <section>
              <span class="icon major fa-code"></span>
              <h3>Easily Customisable</h3>
              <p>
                Ever wished your software had that extra functionality which
                would make your day a whole lot easier? With ERPNext,
                imagination is the limit.
              </p>
            </section>
          </div>
        </div>
      </section>
      <section id="openPositions" class="wrapper style1 fade-up">
        <div class="inner">
          <h2 class="align-center">Current openings</h2>
          <div class="jobs d-flex flex-row">
            <div class="">
              <div
                class="card bg-dark mt-4 p-4"
                v-for="job in jobs"
                :key="job.title"
              >
                <div class="card-body">
                  <h5 class="card-title">{{ job.title }}</h5>
                  <p class="card-text">
                    {{ job.about }}
                  </p>
                  <NuxtLink :to="`jobs/${job.id}`" class="button primary">
                    APPLY NOW
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.careers-page .hero .heading {
  font-weight: bold;
}

.careers-page .hero .sub-heading {
  font-size: 1em;
}

.jobs .card-title {
  font-size: 1.5rem;
}
.jobs .card-text {
  font-size: 1rem;
}
.jobs .card p {
  margin-bottom: 20px;
}

.jobs .card .btn-primary {
  font-size: 0.7rem;
}
</style>

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
