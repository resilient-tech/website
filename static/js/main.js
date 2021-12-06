bindSidebarWithScroll(jQuery)

function bindSidebarWithScroll($) {
  var $sidebar = $('#sidebar')
  if (!$sidebar.length) return

  // Sidebar.
  var $sidebar_a = $sidebar.find('a.nav-item')
  $sidebar_a
    .on('click', function () {
      var $this = $(this)

      // External link? Bail.
      if ($this.attr('href').charAt(0) != '#') return

      // Deactivate all links.
      $sidebar_a.removeClass('active')

      // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
      //   $this.addClass('active').addClass('active-locked')
    })
    .each(function () {
      const $this = $(this)
      const $section = $($this.attr('href'))
      const $logo = $('.logo')

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
          $this.addClass('active')
          // No locked links? Deactivate all links and activate this section's one.
          if ($sidebar_a.filter('.active-locked').length == 0) {
            $sidebar_a.removeClass('active')
            $this.addClass('active')
          }
          // Otherwise, if this section's link is the one that's locked, unlock it.
          else if ($this.hasClass('active-locked'))
            $this.removeClass('active-locked')

          if ($section.attr('id') === 'intro') {
            $logo.removeClass('show')
          } else {
            $logo.addClass('show')
          }
        },
      })
    })
  // hack: scroll 1 px for registering the sidebar underlines
  window.scrollTo(0, 1)
}
