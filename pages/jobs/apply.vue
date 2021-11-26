<template>
  <div class="container">
    <section id="apply" class="card bg-dark fade-up bg mt-5 py-5">
      <div class="m-auto col-10 col-lg-8 mt-5">
        <!-- <span class="image fit"><img src="images/pic04.jpg" alt="" /></span> -->
        <h1>Your Job Application</h1>
        <p>We'd love to have you on our team! Tell us more about yourself.</p>
        <div class="style1">
          <section>
            <form class="job-application" method="post" action="#">
              <div class="fields gtr-uniform">
                <div class="field">
                  <label for="name">Full Name</label>
                  <input type="text" name="name" id="name" v-model="name" />
                </div>
                <div class="field">
                  <label for="email">Email</label>
                  <input type="text" name="email" id="email" v-model="email" />
                </div>
                <div class="field">
                  <label for="phone">Contact Number</label>
                  <input type="text" name="phone" id="phone" v-model="phone" />
                </div>
                <div class="field">
                  <label for="role">Role</label>
                  <select
                    name="role"
                    id="role"
                    value="full-stack-developer-python"
                    v-model="role"
                  >
                    <option value="full-stack-developer-python" selected>
                      Full Stack Developer - Python
                    </option>
                  </select>
                </div>

                <div class="field">
                  <input
                    type="checkbox"
                    id="remote"
                    name="remote"
                    v-model="remote"
                  />
                  <label for="remote">Remote</label>
                </div>

                <div class="field">
                  <label for="github">GitHub Profile URL</label>
                  <input
                    type="text"
                    name="github"
                    id="github"
                    v-model="github"
                  />
                </div>

                <div class="field" style="height: 7em">
                  <label for="resume-file">Resume</label>
                  <input
                    type="file"
                    id="resume-file"
                    hidden
                    accept=".pdf, .doc, .docx"
                  />
                  <button
                    class="button icon solid fa-upload"
                    id="upload-button"
                  >
                    Upload Resume
                  </button>
                  <span id="resume-filename"></span>
                  <i id="remove-file" class="fa fa-close" hidden></i>
                </div>
                <div id="file-warn"></div>

                <div class="field">
                  <label for="about">Tell us about yourself</label>
                  <textarea
                    name="about"
                    id="about"
                    rows="5"
                    v-model="about"
                  ></textarea>
                </div>
                <div class="field">
                  <label for="projects">
                    Tell us something cool you've worked on
                  </label>
                  <textarea
                    name="projects"
                    id="projects"
                    rows="5"
                    v-model="projects"
                  ></textarea>
                </div>
              </div>

              <a
                class="btn btn-primary w-100"
                type="submit"
                @click.stop.prevent="submitForm()"
              >
                SUBMIT
              </a>
              <transition name="fade">
                <div
                  class="alert error mt-4"
                  style="display: block"
                  v-if="hasErrors"
                >
                  <span class="icon fa-times-circle"></span>
                  <strong>Please resolve these errors: </strong>
                  <ul>
                    <li
                      class="error-message"
                      v-for="error in errors"
                      :key="error"
                    >
                      {{ error }}
                    </li>
                  </ul>
                  <a class="close" @click="closeErrorMessage"> &times; </a>
                </div>
              </transition>
              <transition name="fade">
                <div
                  class="alert success"
                  style="display: block"
                  v-if="success"
                >
                  <span class="icon fa-check-circle"></span>
                  Thanks for applying! We'll contact you shortly.
                  <a class="close" href="#">x</a>
                </div>
              </transition>
            </form>
          </section>
        </div>
      </div>
      <a @click="to" aria-hidden="true" class="page-close">&times;</a>
    </section>
  </div>
</template>

<style scoped>
input,
select,
option,
textarea {
  background-color: #282a3f;
}

label {
  font-size: 1rem;
}

.page-close {
  cursor: pointer;
  position: absolute;
  top: 0rem;
  right: 3rem;
  font-size: 5rem;
  text-decoration: none;
  border: 0;
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.close {
  cursor: pointer;
  font-size: 2rem;
  padding: 0;
  right: 1rem;
}
</style>

<script>
export default {
  data() {
    return {
      errors: [],
      name: null,
      email: null,
      phone: null,
      role: true,
      github: null,
      remote: null,
      about: null,
      projects: null,
      success: false,
    }
  },
  methods: {
    submitForm(e) {
      this.errors = []
      this.validateForm()
    },
    validateForm() {
      for (const value of ['name', 'email', 'phone', 'about', 'projects']) {
        if (!this[value]) {
          this.errors.push(`${value} is required!`)
        }
      }

      if (!this.$validateEmail(this.email))
        this.errors.push('Invalid email address!')

      if (!this.$validatePhone(this.phone))
        this.errors.push('Invalid contact number!')
    },
    to() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },

    closeErrorMessage() {
      this.errors = []
    },
    closeSuccessMessage() {
      this.success = false
    },
  },
  computed: {
    hasErrors() {
      return this.errors.length
    },
  },
}
</script>
