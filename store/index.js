export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('jobs/getJobs')
  },
}
