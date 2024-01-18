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
                      <a href="https://github.com/resilient-tech" target="_blank"><span
                          class="label">GitHub</span>
                         
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                          </svg>

                        </a>
                    </li>
                    <li>
                      <a href="https://t.me/sagarvora" target="_blank"><span
                          class="label">Telegram</span>

                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                          </svg>
                        </a>
                    </li>
                   
                    <li>
                      <a href="https://twitter.com/TechResilient" target="_blank">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                        </svg>

                        <span class="label">Twitter</span></a>
                    </li> 

                    <li>
                      <a href="https://in.linkedin.com/company/resilient-tech" target="_blank">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                        </svg>

                        <span class="label">Linkedin</span></a>
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
