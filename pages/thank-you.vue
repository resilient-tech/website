
<template>
  <div class="text-center">
    <div
      class="card bg-dark fade-up mt-5 p-5 col-12 col-lg-6 m-auto text-center"
    >
      <img
        src="~/assets/images/checked.png"
        alt="Success"
        class="success-img"
      />

      <h2>Thank you for applying, <br />we'll connect you shortly!</h2>
      <NuxtLink to="/" class="button primary mt-3">
        <i class="fa fa-home mr-2"></i> Home
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.card {
  align-items: center;
  justify-content: center;
}
img.success-img {
  width: 30%;
  margin-bottom: 2rem;
}

.btn-outline-light:hover,
.btn-outline-light:hover i {
  color: rgba(255, 255, 255, 0.05);
}

/* .btn:hover i {
  color: #000;
} */

h2 {
  font-weight: bold;
}
</style>