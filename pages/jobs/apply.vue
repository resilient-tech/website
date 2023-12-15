<template>
  <div class="container">
    <JobApplicationForm />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Apply Now | Resilient Tech',
    }
  },
  data() {
    return {
      file: null,
      invalidFile: false,
      success: false,
    }
  },
}
</script>
