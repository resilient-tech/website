export const state = () => ({
  jobs: [],
})

export const getters = {
  getJob(state) {
    return (id) => state.jobs.find((job) => job.id == id)
  },
}

export const mutations = {
  jobs(state, jobs) {
    state.jobs = jobs
  },
}

export const actions = {
  async getJobs({ commit }) {
    console.log(`getting jobs`)
    // get jobs from server
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    commit('jobs', [
      {
        id: 1,
        title: 'Full Stack Developer - Python',
        about: `We are currently in search of a self-driven, result-oriented Software Developer to join our team.
          You'll help develop critical products for our clients, and offer excellent technical support.`,
        responsibilities: `Producing clean, efficient code based on specifications
            Designing features that deliver a great user experience
            Writing adequate test cases to supplement your code
            Writing clear documentation for new and existing features
            Contributing to open source software using Git
            Quickly learning new tools and technologies
            Communicating effectively with relevant stakeholders`,
        requiredExperience: `Working on a web application using Python
            Writing and improving frontend code
            Managing a MariaDB or MySQL database
            Working with a Linux-based OS or MacOS`,
        preferredExperience: `Working with ERPNext or other business software
            liProper understanding of basic business processes`,
        technologies: `Python 3
            Javascript - VueJS / jQuery / Bootstrap
            PostgreSQL / MariaDB / MySQL
            CSS3 / Sass / HTML5
            Linux-based OSes / MacOS
            Git / Github`,
        benefits: `Feel good about contributing to open source software
            Collaborate with some of the best open source developers in India
            Choose your own project
            Flexible work hours
            Remote-friendly`,
      },
      {
        id: 2,
        title: 'Full Stack Developer - Python II',
        about: `We are currently in search of a self-driven, result-oriented Software Developer to join our team.
          You'll help develop critical products for our clients, and offer excellent technical support.`,
        responsibilities: `Producing clean, efficient code based on specifications
            Designing features that deliver a great user experience
            Writing adequate test cases to supplement your code
            Writing clear documentation for new and existing features
            Contributing to open source software using Git
            Quickly learning new tools and technologies
            Communicating effectively with relevant stakeholders`,
        requiredExperience: `Working on a web application using Python
            Writing and improving frontend code
            Managing a MariaDB or MySQL database
            Working with a Linux-based OS or MacOS`,
        preferredExperience: `Working with ERPNext or other business software
            liProper understanding of basic business processes`,
        technologies: `Python 3
            Javascript - VueJS / jQuery / Bootstrap
            PostgreSQL / MariaDB / MySQL
            CSS3 / Sass / HTML5
            Linux-based OSes / MacOS
            Git / Github`,
        benefits: `Feel good about contributing to open source software
            Collaborate with some of the best open source developers in India
            Choose your own project
            Flexible work hours
            Remote-friendly`,
      },
    ])
  },
}
