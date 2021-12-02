export default ({ app }, inject) => {
  inject(
    'validateRequired',
    (value, label = 'Value') => !value && `${label} must not be empty`
  )
  inject('validateEmail', (value) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  )

  inject('validatePhone', (value) => /^([0-9 +_\-,.*#()]){1,20}$/.test(value))

  inject('validateUrl', (value) =>
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
      value
    )
  )

  inject('bindSidebarWithScroll', ($) => {
    var $sidebar = $('#sidebar')
    if (!$sidebar.length) return

    // Sidebar.
    var $sidebar_a = $sidebar.find('a.nav-item')
    $sidebar_a
      .addClass('scrolly')
      .on('click', function () {
        var $this = $(this)

        // External link? Bail.
        if ($this.attr('href').charAt(0) != '#') return

        // Deactivate all links.
        $sidebar_a.removeClass('active')

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this.addClass('active').addClass('active-locked')
      })
      .each(function () {
        const $this = $(this)
        const $section = $($this.attr('href'))
        // No section for this link? Bail.
        if ($section.length < 1) return
        // Scrollex.
        $section.scrollex({
          mode: 'middle',
          top: '-20vh',
          bottom: '-20vh',
          initialize() {
            // Deactivate section.
            $section.addClass('inactive')
          },
          enter() {
            // Activate section.
            $section.removeClass('inactive')
            // No locked links? Deactivate all links and activate this section's one.
            if ($sidebar_a.filter('.active-locked').length == 0) {
              $sidebar_a.removeClass('active')
              $this.addClass('active')
            }
            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass('active-locked'))
              $this.removeClass('active-locked')
          },
        })
      })
  })
}
