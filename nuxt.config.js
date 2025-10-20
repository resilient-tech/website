export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {

    title: 'Resilient Software Services LLP',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },

      { hid: 'description', name: 'description', content: 'We inspire business growth with simple, yet powerful software experiences.' },
      { hid: 'keywords', name: 'keywords', content: 'Resilient Tech, Resilient Software Services LLP, ERP, ERPNext, Frappe, open source, software, customization, e-Commerce ERP, Manufacturing ERP, HRMS, India Compliance' },
      { hid: 'author', name: 'author', content: 'Resilient Software Services LLP' },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { hid: 'googlebot', name: 'robots', content: 'index, follow' },
      { hid: 'copyright', name: 'copyright', content: 'Copyright © 2024, Resilient Software Services LLP' },
      { hid: 'revisit-after', name: 'revisit-after', content: '7 days' },

      { hid: 'og:title', property: 'og:title', content: 'Resilient Software Services LLP' },
      { hid: 'og:description', property: 'og:description', content: 'We inspire business growth with simple, yet powerful software experiences.' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: 'https://www.resilient.tech/' },
      { hid: 'og:image', property: 'og:image', content: 'https://www.resilient.tech/_nuxt/assets/images/OG-Share.jpg' },
      { hid: 'og:image:alt', name: 'og:image:alt', content: 'Resilient Software Services LLP Logo' },
      { hid: 'og:image:width', name: 'og:image:width', content: '1200' },
      { hid: 'og:image:height', name: 'og:image:height', content: '675' },


      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Resilient Software Services LLP' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'We inspire business growth with simple, yet powerful software experiences.' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://www.resilient.tech/_nuxt/assets/images/OG-Share.jpg' }, // note : image is png so may get problem
      { hid: 'twitter:image:width', name: 'twitter:image:width', content: '1200' },
      { hid: 'twitter:image:height', name: 'twitter:image:height', content: '675' },

    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap',
        // href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;800&display=swap',
      },
    ],
    script: [
      { type: 'text/javascript', src: '/js/jquery.min.js', body: true },
      {
        type: 'text/javascript',
        src: '/js/jquery.scrollex.min.js',
        body: true,
      },
      { type: 'text/javascript', src: '/js/main.js', body: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/font-awesome.min.css',
    '~/assets/scss/custom.scss',
    '~/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/bootstrap.js', '~/plugins/utils.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/ui',
      '~/components/home',
      '~/components/jobs',
    ],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    'nuxt-purgecss',
  ],

  purgeCSS: {
    mode: 'webpack',
    enabled: ({ isDev, isClient }) => !isDev && isClient, // or `false` when in dev/debug mode
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
    ],
    styleExtensions: ['.css'],
    whitelist: ['body', 'html', 'nuxt-progress'],
    extractors: [
      {
        extractor: (content) => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js'],
      },
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['altcha'], // Transpile the altcha package for older webpack versions
  },

  // Vue configuration for custom elements (for ALTCHA)
  vue: {
    config: {
      ignoredElements: ['altcha-widget'],
    },
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  bootstrapVue: {
    bootstrapCSS: false,
    icons: false,
  },

  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
}
