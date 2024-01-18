<template>
  <div>
    <Sidebar :navItems="{
      Welcome: '#intro',
      ERPNext: '#erpnext',
      'Our Services': '#services',
      'Get in touch': '#contact',
    }">
      <!-- <div class="sidebar-action mx-auto">
        <span class="hiring-text">
          We're hiring!
        </span>
        <NuxtLink to="/careers" class="hiring-link">Apply Now</NuxtLink>
      </div> -->
    </Sidebar>
    <div id="wrapper">
      <!-- Intro -->
      <section id="intro" class="wrapper style1 fullscreen align-center">
        <div class="inner">
          <h1>
            <Logo />
          </h1>
          <p>
            We inspire business growth with simple, yet powerful software
            experiences.
          </p>
        </div>
      </section>

      <!-- ERPNext -->
      <section id="erpnext" class="wrapper style1 fade-up">
        <div class="inner">
          <h2 class="align-center">
            We <span class="icon fa-heart red"></span> ERPNext
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

      <!-- Services -->
      <section id="services" class="wrapper style1 fade-up">
        <div class="inner">
          <h2 class="align-center">Our Services</h2>
          <p>
            We strive to make ERPNext a delightful experience for our clients.
            To achieve this, we offer a variety of services.
          </p>
          <div class="features">
            <section>
              <span class="icon major fa-cog"></span>
              <h3>Setup</h3>
              <p>
                Installing ERPNext can be daunting if you have no prior
                experience. We can do that for you. Our setup service also
                includes setting up SSL, Email, SMS, Dropbox Backups and more.
              </p>
            </section>
            <section>
              <span class="icon major fa-code"></span>
              <h3>Customisation</h3>
              <p>
                Whether you want a missing functionality, a custom report, or
                personalised print formats, we can design and develop it for
                you. We also contribute it back to ERPNext, so that other users
                can benefit from it.
              </p>
            </section>
            <section>
              <span class="icon major fa-exchange"></span>
              <h3>Data Migration</h3>
              <p>
                Moving to ERPNext from an existing system? We can migrate the
                data to your ERPNext server for you. We also offer services to
                bulk import / export data.
              </p>
            </section>
            <section>
              <span class="icon major fa-link"></span>
              <h3>Integrations</h3>
              <p>
                We can help you integrate ERPNext with an existing service so
                that you can seamlessly manage all your business operations from
                within ERPNext.
              </p>
            </section>
            <section>
              <span class="icon major fa-users"></span>
              <h3>Training</h3>
              <p>
                We offer on-site training to help your team get things done in
                ERPNext. This is specifically tailored to your company's
                requirements and will boost the confidence and efficiency of
                your team.
              </p>
            </section>
            <section>
              <span class="icon major fa-life-ring"></span>
              <h3>Support and Maintenance</h3>
              <p>
                Something went wrong? Feeling stuck? You can call or email us.
                We can also setup a remote desktop session to resolve the issue
                if required. Additionally, we can handle your software and
                system upgrades.
              </p>
            </section>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="wrapper style1 fade-up">
        <div class="inner">
          <h2>Get in touch.</h2>
          <p>
            We'd love to help you streamline your business processes.<br />
            Fill the form below and we'll get back to you quickly.
          </p>
          <div class="split style1">
            <ContactForm />
            <section>
              <ul class="contact">
                <li>
                  <h3>Address</h3>
                  <span>101, Deepam Signature<br />
                    Jetalpur Road<br />
                    Alkapuri, Vadodara<br />
                    Gujarat, India - 390020
                  </span>
                </li>
                <li>
                  <h3>Email</h3>
                  <a href="mailto:info@resilient.tech"> info@resilient.tech </a>
                </li>
                <li>
                  <h3>Social</h3>
                  <ul class="icons">
                    <li>
                      <a href="https://github.com/resilient-tech" target="_blank" class="fa-github"><span
                          class="label">GitHub</span></a>
                    </li>
                    <li>
                      <a href="https://t.me/sagarvora" target="_blank" class="fa-telegram"><span
                          class="label">Telegram</span></a>
                    </li>
                    <li>
                      <a href="https://twitter.com/TechResilient" target="_blank" class="fa-twitter"><span
                          class="label">Twitter</span></a>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.sidebar-action {
  font-size: large;
}
</style>
<script>
import Logo from '~/components/ui/Logo.vue'
export default {
  components: { Logo },
  head() {
    return {
      title: 'Resilient Tech',

      meta: [
        { hid: 'description', name: 'description', content: 'We inspire business growth with simple, yet powerful software experiences.' },
        { hid: 'keywords', name: 'keywords', content: 'Resilient Tech, ERP, ERPNext, Frappe, open source, software, customization, e-Commerce ERP, Manufacturing ERP, HRMS, India Compliance' },
        { hid: 'author', name: 'author', content: 'Resilient Tech' },
        { hid: 'robots', name: 'robots', content: 'index, follow' },
        { hid: 'googlebot', name: 'robots', content: 'index, follow' },
        { hid: 'copyright', name: 'copyright', content: 'Copyright © 2024, Resilient Tech' },
        { hid: 'revisit-after', name: 'revisit-after', content: '7 days' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },

        { hid: 'og:title', property: 'og:title', content: 'Resilient Tech' },
        { hid: 'og:description', property: 'og:description', content: 'We inspire business growth with simple, yet powerful software experiences.' },
        { hid: 'og:type', name: 'og:type', content: 'website' },
        { hid: 'og:url', name: 'og:url', content: 'https://www.resilient.tech/' },
        { hid: 'og:image', property: 'og:image', content: 'https://www.resilient.tech/_nuxt/img/logo_white.1d040bc.png' },
        { hid: 'og:image:alt', name: 'og:image:alt', content: 'Resilient Tech Logo' },

        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Resilient Tech' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'We inspire business growth with simple, yet powerful software experiences.' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://www.resilient.tech/_nuxt/img/logo_white.1d040bc.png' }, // note : image is png so may get problem 
      ],

    }
  },
}
</script>
