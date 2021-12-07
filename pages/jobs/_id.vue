<template>
  <div>
    <Sidebar
      :navItems="{
        Responsibilities: '#responsibilities',
        Experience: '#experience',
        Benefits: '#benefits',
      }"
    >
      <NuxtLink
        to="/careers"
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
        Open Positions
      </NuxtLink>
    </Sidebar>
    <div id="wrapper">
      <section id="about" class="wrapper style2 bg">
        <div class="inner">
          <h2 class="major title">{{ job.title }}</h2>
          <div>
            <h3>About the job</h3>
            {{ job.about }}
            <br />
            <br />
            <h3 id="responsibilities">Responsibilities and Duties</h3>
            <ul>
              <li
                v-for="responsibility in job.responsibilities.split('\n')"
                :key="responsibility"
              >
                {{ responsibility }}
              </li>
            </ul>
            <br />
            <h3 id="experience">Required Experience</h3>
            <ul>
              <li v-for="exp in job.requiredExperience.split('\n')" :key="exp">
                {{ exp }}
              </li>
            </ul>
            <br />
            <h3>Preferred Experience</h3>
            <ul>
              <li v-for="exp in job.preferredExperience.split('\n')" :key="exp">
                {{ exp }}
              </li>
            </ul>
            <h3>Technologies we use include:</h3>
            <ul>
              <li
                v-for="technlogy in job.technologies.split('\n')"
                :key="technlogy"
              >
                {{ technlogy }}
              </li>
            </ul>
            <h3 id="benefits">Benefits</h3>
            <ul>
              <li v-for="benefit in job.benefits.split('\n')" :key="benefit">
                {{ benefit }}
              </li>
            </ul>
          </div>
          <NuxtLink
            :to="`/jobs/apply?position=${job.id}`"
            class="button primary"
          >
            Apply Now
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.major {
  margin: 0 0 1.3em 0;
  position: relative;
  padding-bottom: 0.35em;
}
.major:after {
  background-image: -moz-linear-gradient(to right, #4cc49d, #54aa40);
  background-image: -webkit-linear-gradient(to right, #4cc49d, #54aa40);
  background-image: -ms-linear-gradient(to right, #4cc49d, #54aa40);
  background-image: linear-gradient(to right, #4cc49d, #54aa40);
  -moz-transition: max-width 0.2s ease;
  -webkit-transition: max-width 0.2s ease;
  -ms-transition: max-width 0.2s ease;
  transition: max-width 0.2s ease;
  border-radius: 0.2em;
  bottom: 0;
  content: '';
  height: 0.1em;
  position: absolute;
  right: 0;
  width: 100%;
}

#careers .title {
  font-size: 2.5rem;
}
</style>

<script>
export default {
  head() {
    return {
      title: `${
        this.$store.getters['jobs/getJob'](this.$route.params.id).title
      } | Reslient Tech`,
    }
  },
  data() {
    return {
      job: this.$store.getters['jobs/getJob'](this.$route.params.id),
    }
  },
}
</script>