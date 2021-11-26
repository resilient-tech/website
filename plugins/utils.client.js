export default ({ app }, inject) => {
  inject('validateEmail', (value) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  )

  inject('validatePhone', (value) => /^([0-9 +_\-,.*#()]){1,20}$/.test(value))
}
