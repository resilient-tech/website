<template>
  <section id="sidebar" v-if="sidebarItems">
    <div class="inner">
      <h3 class="text-center mb-5"><Logo class="mt-5" /></h3>
      <nav>
        <ul>
          <li v-for="(href, title) in navItems" :key="title" class="scrolly">
            <a :href="href" class="nav-item">
              {{ title }}
            </a>
          </li>
          <li v-if="'action' in sidebarItems">
            <NuxtLink
              :to="sidebarItems.action.to"
              class="nuxt-link"
              v-if="sidebarItems.action.type === 'primary'"
            >
              <span class="button fit careers">
                {{ sidebarItems.action.title }}
              </span>
            </NuxtLink>
            <NuxtLink
              :to="sidebarItems.action.to"
              class="btn btn-outline-primary"
              v-else
            >
              <i class="fa fa-angle-left" style="font-size: 1.2rem"></i>
              <span class="mx-2">{{ sidebarItems.action.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    this.activeItem = Object.values(this.sidebarItems)[0]
  },

  mounted() {
    this.$bindSidebarWithScroll(window.jQuery)
  },

  computed: {
    isHome() {
      return this.$route.path === '/'
    },
    sidebarItems() {
      const items = {
        home: {
          Welcome: '#intro',
          ERPNext: '#erpnext',
          'Our Services': '#services',
          'Get in touch': '#contact',
          action: {
            title: 'Careers',
            type: 'primary', // accepted values: primary | secondary
            to: '/careers',
          },
        },
        careers: {
          Welcome: '#intro',
          'Our Values': '#ourValues',
          'Open Positions': '#openPositions',
          action: {
            title: 'Back to Home',
            type: 'secondary',
            to: '/',
          },
        },
        job: {
          'About Job': '#about',
          Responsibilities: '#responsibilities',
          Experience: '#experience',
          Benefits: '#benefits',
          action: {
            title: 'All Open Positions',
            type: 'secondary',
            to: '/careers',
          },
        },
      }
      if (this.$route.path === '/careers') return items.careers

      if (this.$route.path.includes('/jobs/')) return items.job

      return items.home
    },
    navItems() {
      const items = this.sidebarItems
      return Object.fromEntries(
        Object.entries(items).filter(([title, href]) => title !== 'action')
      )
    },
  },
}
</script>
