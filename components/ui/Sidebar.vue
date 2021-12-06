<template>
  <section id="sidebar">
    <div class="inner">
      <h3 class="text-center mb-5">
        <NuxtLink to="/" class="border-0"><Logo class="mt-5 logo" /></NuxtLink>
      </h3>

      <nav>
        <ul>
          <li v-for="(href, title) in navItems" :key="title">
            <a :href="href" class="nav-item">
              {{ title }}
            </a>
          </li>
        </ul>
      </nav>
      <slot v-if="hasDefaultSlot"></slot>
      <div v-else></div>
      <!-- <div v-if="'action' in sidebarItems">

        <NuxtLink :to="sidebarItems.action.to" class="button" v-else>
          <i class="fa fa-angle-left" style="font-size: 1.2rem"></i>
          <span class="mx-2">{{ sidebarItems.action.title }}</span>
        </NuxtLink>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
#sidebar .inner {
  justify-content: space-around;
}

@media screen and (max-width: 1280px) {
  .logo {
    display: none;
  }
}
</style>

<script>
export default {
  mounted() {
    bindSidebarWithScroll(window.jQuery)
  },
  created() {},
  props: {
    navItems: Object,
    actionButton: Object,
  },

  computed: {
    hasDefaultSlot() {
      return this.$slots.default
    },
    // sidebarItems() {
    //   const items = {
    //     home: {
    //       Welcome: '#intro',
    //       ERPNext: '#erpnext',
    //       'Our Services': '#services',
    //       'Get in touch': '#contact',
    //       action: {
    //         title: 'Careers',
    //         type: 'primary', // accepted values: primary | secondary
    //         to: '/careers',
    //       },
    //     },
    //     careers: {
    //       action: {
    //         title: 'Back to Home',
    //         type: 'secondary',
    //         to: '/',
    //       },
    //     },
    //     job: {
    //       action: {
    //         title: 'Open Positions',
    //         type: 'secondary',
    //         to: '/careers',
    //       },
    //     },
    //   }
    //   if (this.$route.path === '/careers') return items.careers
    //   if (this.$route.path.includes('/jobs/')) return items.job
    //   return items.home
    // },
  },
}
</script>
