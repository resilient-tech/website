<template>
  <main>
    <LogoIntro />

    <section class="section statement container">
      <p v-reveal class="label rise">In short</p>
      <LitText
        text="We help businesses run on one system instead of ten. We set up ERPNext, shape it around how you actually work, and contribute what we build back to the project."
      />
    </section>

    <section id="erpnext" class="section container">
      <div v-reveal class="section-head">
        <p class="label rise">Why ERPNext</p>
        <SplitText class="title" text="Six reasons we *build on* ERPNext." />
        <p class="lead rise" style="--d: 0.3s">
          It's the modern, easy-to-use, 100% open-source business management
          system used by thousands of enterprises worldwide. Here's why we love
          it.
        </p>
      </div>
      <ol class="reasons">
        <li
          v-for="(reason, i) in reasons"
          :key="reason.title"
          v-reveal
          class="reason"
          :style="{ '--d': `${(i % 3) * 0.1}s` }"
        >
          <span class="reason-line draw" />
          <span class="reason-num rise">{{ pad(i) }}</span>
          <h3 class="rise">{{ reason.title }}</h3>
          <p class="rise">{{ reason.text }}</p>
        </li>
      </ol>
    </section>

    <section id="services" class="paper">
      <div class="section container services">
        <div v-reveal class="services-head">
          <p class="label rise">What we do</p>
          <SplitText class="title" text="From the first install to the *tenth upgrade.*" />
          <p class="rise" style="--d: 0.3s">
            We strive to make ERPNext a delightful experience for our clients.
            Here's how we help.
          </p>
          <a href="#contact" class="btn btn-dark rise" style="--d: 0.4s">
            Start a project <span class="arrow">→</span>
          </a>
        </div>
        <ol class="service-list">
          <li
            v-for="(service, i) in services"
            :key="service.title"
            v-reveal
            class="service rise"
          >
            <span class="service-num">{{ pad(i) }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section id="open-source" class="section container open-source">
      <div v-reveal class="os-copy">
        <p class="label rise">Open source</p>
        <SplitText class="title" text="We don't just use open source. We *ship* it." />
        <p class="lead rise" style="--d: 0.3s">
          Our biggest contribution is India Compliance, the ERPNext app that
          handles GST for Indian businesses. Our team builds and maintains it in
          the open, and it's free for anyone to use.
        </p>
        <ul class="os-features">
          <li
            v-for="(feature, i) in features"
            :key="feature"
            class="rise"
            :style="{ '--d': `${0.4 + i * 0.07}s` }"
          >
            {{ feature }}
          </li>
        </ul>
        <div class="os-links rise" style="--d: 0.8s">
          <a href="https://indiacompliance.app" target="_blank" rel="noopener" class="link">
            indiacompliance.app <span class="arrow">↗</span>
          </a>
          <a href="https://github.com/resilient-tech/india-compliance" target="_blank" rel="noopener" class="link">
            Source on GitHub <span class="arrow">↗</span>
          </a>
        </div>
      </div>

      <div v-reveal class="terminal rise" aria-label="Installing India Compliance with bench">
        <div class="terminal-bar"><i /><i /><i /><span>~/frappe-bench</span></div>
        <pre><code><span class="t-line" style="--d: 0.5s"><b>$</b> bench get-app https://github.com/resilient-tech/india-compliance</span><span class="t-line" style="--d: 2s"><b>$</b> bench --site erp.yourcompany.in install-app india_compliance</span><span class="t-line t-out" style="--d: 3.4s">Installing india_compliance...</span><span class="t-line t-cursor" style="--d: 3.9s"><b>$</b> </span></code></pre>
      </div>
    </section>

    <section id="contact" class="section container contact">
      <div v-reveal class="contact-copy">
        <p class="label rise">Contact</p>
        <SplitText class="title" text="Tell us how your business *runs.*" />
        <p class="lead rise" style="--d: 0.3s">
          We'd love to help you streamline your business processes. Fill in the
          form and we'll get back to you quickly.
        </p>
        <dl class="contact-details rise" style="--d: 0.4s">
          <div>
            <dt>Email</dt>
            <dd><a href="mailto:info@resilient.tech" class="link">info@resilient.tech</a></dd>
          </div>
          <div>
            <dt>Office</dt>
            <dd>
              <a href="https://maps.app.goo.gl/pD4VbXmZoaTDbRFF9" target="_blank" rel="noopener">
                101, Deepam Signature, Jetalpur Road<br />
                Alkapuri, Vadodara, Gujarat 390020
              </a>
            </dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd class="contact-social">
              <a href="https://github.com/resilient-tech" target="_blank" rel="noopener" class="link">GitHub</a>
              <a href="https://in.linkedin.com/company/resilient-tech" target="_blank" rel="noopener" class="link">LinkedIn</a>
            </dd>
          </div>
        </dl>
      </div>
      <div v-reveal class="contact-form rise" style="--d: 0.2s">
        <ContactForm />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      reasons: [
        { title: 'Simple', text: 'Business software can be daunting. ERPNext keeps it simple and intuitive, so getting started is a breeze.' },
        { title: 'Web based', text: "It works whatever device you're on. Phone or laptop, your business is a browser tab away." },
        { title: 'Cloud ready', text: 'Hosted in the cloud, your data stays safe, secure and reachable wherever you are.' },
        { title: 'Comprehensive', text: 'No more juggling a different app for every job. Everything you need lives in one place.' },
        { title: 'Open source', text: 'Thousands of people worldwide, us included, contribute to it. Better tested, more secure software for everyone.' },
        { title: 'Customisable', text: 'Wish it had that one feature that would make your day easier? With ERPNext, it can be built.' },
      ],
      services: [
        { title: 'Setup', text: "Installing ERPNext can be daunting if you haven't done it before. We do it for you, including SSL, email, SMS and Dropbox backups." },
        { title: 'Customisation', text: 'A missing feature, a custom report, print formats that look like yours. We design and build it, then contribute it back to ERPNext so other users benefit too.' },
        { title: 'Data migration', text: 'Moving from another system? We bring your data across to your ERPNext server, and handle bulk imports and exports.' },
        { title: 'Integrations', text: 'We connect ERPNext with the services you already use, so you can manage all your business operations from one place.' },
        { title: 'Training', text: "On-site training tailored to your company's needs, so your team gets things done in ERPNext with confidence." },
        { title: 'Support & maintenance', text: 'Stuck? Call or email us, and we can take a remote session if needed. We also handle your software and system upgrades.' },
      ],
      features: [
        'GSTR-1 preparation with checks before you file',
        'Invoice Management System (IMS) for accurate GSTR-3B',
        'Purchase reconciliation against GSTR-2B and GSTR-2A',
        'e-Invoice and e-Waybill through the NIC portal',
        'Instant GSTIN checks against government APIs',
      ],
    }
  },

  methods: {
    pad(i) {
      return String(i + 1).padStart(2, '0')
    },
  },
}
</script>

<style scoped>
.statement {
  max-width: 1100px;
}

.reasons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 clamp(24px, 4vw, 56px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.reason {
  position: relative;
  padding: 32px 0 56px;
}

.reason-line {
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: var(--faint);
}

.reason-num,
.service-num {
  display: block;
  margin-bottom: 40px;
  font: 500 12px/1 var(--mono);
  color: var(--leaf);
}

.reason h3 {
  margin-bottom: 14px;
  font-size: clamp(26px, 2.4vw, 34px);
}

.reason p {
  max-width: 26em;
  margin: 0;
  color: var(--muted);
}

.reason .rise:nth-child(3) {
  transition-delay: calc(var(--d) + 0.08s);
}

.reason .rise:nth-child(4) {
  transition-delay: calc(var(--d) + 0.16s);
}

.paper {
  background: var(--paper);
  color: var(--paper-ink);
  --muted: var(--paper-muted);
}

.paper ::selection {
  background: var(--paper-ink);
  color: var(--paper);
}

.paper h2 ::v-deep em {
  color: var(--leaf-deep);
}

/* sheet opens to full width as it scrolls in, where supported */
@supports (animation-timeline: view()) {
  .motion-ok .paper {
    animation: sheet-open linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 70%;
  }
}

@keyframes sheet-open {
  from {
    clip-path: inset(0 3vw round 40px);
  }
  to {
    clip-path: inset(0 0 round 0px);
  }
}

.services {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(48px, 7vw, 120px);
  align-items: start;
}

.services-head {
  position: sticky;
  top: calc(var(--nav-h) + 48px);
}

.services-head > p:not(.label) {
  max-width: 24em;
  margin-bottom: 36px;
  color: var(--paper-muted);
  font-size: 18px;
}

.btn-dark {
  background: var(--paper-ink);
  border-color: var(--paper-ink);
  color: var(--paper);
}

.btn-dark::before {
  background: var(--leaf);
}

.btn-dark:hover {
  border-color: var(--leaf);
}

.service-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid var(--paper-line);
}

.service {
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 4px 16px;
  padding: 36px 0 40px;
  border-top: 1px solid var(--paper-line);
}

.service::after {
  content: '';
  position: absolute;
  left: 0;
  top: -1px;
  width: 100%;
  height: 2px;
  background: var(--leaf-deep);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--ease);
}

.service:hover::after {
  transform: scaleX(1);
}

.service-num {
  grid-row: span 2;
  margin: 10px 0 0;
  color: var(--leaf-deep);
}

.service h3 {
  font-size: clamp(28px, 3vw, 42px);
  transition: translate 0.6s var(--ease);
}

.service:hover h3 {
  translate: 10px 0;
}

.service p {
  max-width: 34em;
  margin: 12px 0 0;
  color: var(--paper-muted);
}

.open-source {
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
  gap: clamp(48px, 6vw, 96px);
  align-items: center;
}

.os-features {
  margin: 36px 0 40px;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--faint);
}

.os-features li {
  padding: 14px 0 14px 30px;
  border-bottom: 1px solid var(--faint);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3E%3Cpath d='M0 4.2h4M4 4c1.6-2.6 3.4-3.6 5-3.6 1.7 0 3.4 1.2 5 3.6-1.6 2.4-3.3 3.6-5 3.6-1.6 0-3.4-1-5-3.6z' fill='%235cb946' stroke='%235cb946' stroke-width='.6'/%3E%3C/svg%3E") 0 50% no-repeat;
}

.os-links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  font-weight: 500;
}

.terminal {
  overflow: hidden;
  border: 1px solid var(--faint);
  border-radius: 16px;
  background: #080d0b;
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.7);
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--faint);
  font: 12px/1 var(--mono);
  color: var(--muted);
}

.terminal-bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--faint);
}

.terminal-bar span {
  margin-left: 10px;
}

.terminal pre {
  margin: 0;
  padding: 26px 22px 30px;
  font: 13.5px/1.9 var(--mono);
  white-space: pre-wrap;
  word-break: break-all;
}

.t-line {
  display: block;
}

.t-line b {
  font-weight: 400;
  color: var(--leaf);
}

.t-out {
  color: var(--muted);
}

.t-cursor::after {
  content: '';
  display: inline-block;
  width: 8px;
  height: 1.1em;
  vertical-align: text-bottom;
  background: var(--cream);
  animation: blink 1.1s steps(1) infinite;
}

/* commands type themselves out once the card is in view */
.motion-ok .terminal .t-line {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.3s steps(42) var(--d);
}

.motion-ok .terminal.is-in .t-line {
  clip-path: inset(0 0 0 0);
}

.motion-ok .terminal .t-out,
.motion-ok .terminal .t-cursor {
  transition-duration: 0.01s;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.contact {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(48px, 7vw, 112px);
  align-items: start;
}

.contact-details {
  display: grid;
  gap: 26px;
  margin: 40px 0 0;
}

.contact-details dt {
  margin-bottom: 6px;
  font: 500 12px/1 var(--mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.contact-details dd {
  margin: 0;
  font-size: 18px;
}

.contact-social {
  display: flex;
  gap: 24px;
}

.contact-form {
  padding: clamp(28px, 4vw, 48px);
  border: 1px solid var(--faint);
  border-radius: 24px;
  background: var(--ink-2);
}

@media (max-width: 960px) {
  .reasons {
    grid-template-columns: repeat(2, 1fr);
  }

  .services,
  .open-source,
  .contact {
    grid-template-columns: 1fr;
  }

  .services-head {
    position: static;
  }
}

@media (max-width: 600px) {
  .reasons {
    grid-template-columns: 1fr;
  }

  .reason {
    padding-bottom: 40px;
  }

  .reason-num {
    margin-bottom: 20px;
  }

  .service {
    grid-template-columns: 40px 1fr;
  }
}
</style>
