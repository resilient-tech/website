<template>
  <div class="container">
    <JobApplicationForm />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Apply Now | Reslient Tech',
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
