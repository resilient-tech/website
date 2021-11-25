;(function ($) {
  var $window = $(window),
    $body = $('body'),
    $sidebar = $('#sidebar')

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px'],
  })

  // Hack: Enable IE flexbox workarounds.
  if (browser.name == 'ie') $body.addClass('is-ie')

  // Play initial animations on page load.
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload')
    }, 100)
  })

  // Forms.

  // Hack: Activate non-input submits.
  $('form').on('click', '.submit', function (event) {
    // Stop propagation, default.
    event.stopPropagation()
    event.preventDefault()

    // Submit form.
    $(this).parents('form').submit()
  })

  $('.contact-us').submit(function (event) {
    event.preventDefault()
    $('.alert.error').hide()
    $('.alert.success').hide()
    var name = $('input#name')[0].value
    var email = $('input#email')[0].value
    var message = $('textarea#message')[0].value
    var error_field = ''
    $.each({ Name: name, Email: email, Message: message }, function (key, val) {
      if (!val) {
        error_field = key
        return false
      }
    })
    if (error_field) {
      error_field = "<span style='font-weight: 500;'>" + error_field + '</span>'
      $('.error-message').html(
        'Please enter a value in the field ' + error_field + '.'
      )
      $('.alert.error').fadeIn()
      return
    }

    if (!validate_email(email)) {
      $('.error-message').html("The email address you've entered is incorrect.")
      $('.alert.error').fadeIn()
      return
    }

    frappe.send_message(
      {
        subject: 'Website message from ' + name,
        sender: email,
        message:
          'Name: ' +
          name +
          '<br>' +
          'Email: ' +
          email +
          '<br>' +
          'Message: ' +
          message,
        callback: function (r) {
          if (r.message === 'okay') {
            $('.alert.success').fadeIn()
            $(':input').val('')
          } else {
            $('.error-message').html(r.message)
            $('.alert.error').fadeIn()
          }
        },
      },
      this
    )
  })

  $('.job-application').submit(function (event) {
    event.preventDefault()
    $('.alert.error').hide()
    $('.alert.success').hide()

    let data = $('.job-application')
      .serializeArray()
      .reduce(function (obj, item) {
        obj[item.name] = item.value
        return obj
      }, {})

    let error_field = ''
    $.each(data, function (key, val) {
      if (key == 'remote') return true

      if (!val) {
        error_field = key
        return false
      }
    })

    if (error_field) {
      if (!['about', 'projects'].includes(error_field)) {
        error_field =
          "<span style='font-weight: 500;'>" +
          error_field.charAt(0).toUpperCase() +
          error_field.slice(1) +
          '</span>'
        $('.error-message').html(
          'Please enter a value in the field ' + error_field + '.'
        )
      }

      if (error_field == 'about')
        $('.error-message').html(
          "Don't forget to tell us something about yourself"
        )

      if (error_field == 'projects')
        $('.error-message').html(
          "We'd like to know something about that cool project you've worked on"
        )

      $('.alert.error').fadeIn()
      return
    }

    if (!validate_email(data.email)) {
      $('.error-message').html("The email address you've entered is incorrect.")
      $('.alert.error').fadeIn()
      return
    }

    if (!validate_phone(data.phone)) {
      $('.error-message').html("The phone number you've entered is incorrect.")
      $('.alert.error').fadeIn()
      return
    }

    console.log(data)

    // frappe.call({
    // 	method: "resilient_erp.resilient_erp.job_application.make_job_application",
    // 	args: {
    // 		form_data: data
    // 	},
    // 	callback: function(r) {
    // 		console.log(r)
    // 		if (r.message === 'okay'){
    // 			$('.alert.success').fadeIn();
    // 			$(':input').val('');
    // 		} else {
    // 			$('.error-message').html(r.message);
    // 			$('.alert.error').fadeIn();
    // 		}
    // 	}
    // });
  })

  // Sidebar.
  if ($sidebar.length > 0) {
    var $sidebar_a = $sidebar.find('a:not(.nuxt-link)')

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
        var $this = $(this),
          id = $this.attr('href'),
          $section = $(id)

        // No section for this link? Bail.
        if ($section.length < 1) return

        // Scrollex.
        $section.scrollex({
          mode: 'middle',
          top: '-20vh',
          bottom: '-20vh',
          initialize: function () {
            // Deactivate section.
            $section.addClass('inactive')
          },
          enter: function () {
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
  }

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1000,
    offset: function () {
      // If <=large, >small, and sidebar is present, use its height as the offset.
      if (
        breakpoints.active('<=large') &&
        !breakpoints.active('<=small') &&
        $sidebar.length > 0
      )
        return $sidebar.height()

      return 0
    },
  })

  // Spotlights.
  $('.spotlights > section')
    .scrollex({
      mode: 'middle',
      top: '-10vh',
      bottom: '-10vh',
      initialize: function () {
        // Deactivate section.
        $(this).addClass('inactive')
      },
      enter: function () {
        // Activate section.
        $(this).removeClass('inactive')
      },
    })
    .each(function () {
      var $this = $(this),
        $image = $this.find('.image'),
        $img = $image.find('img'),
        x

      // Assign image.
      $image.css('background-image', 'url(' + $img.attr('src') + ')')

      // Set background position.
      if ((x = $img.data('position'))) $image.css('background-position', x)

      // Hide <img>.
      $img.hide()
    })

  // Features.
  $('.features').scrollex({
    mode: 'middle',
    top: '-20vh',
    bottom: '-20vh',
    initialize: function () {
      // Deactivate section.
      $(this).addClass('inactive')
    },
    enter: function () {
      // Activate section.
      $(this).removeClass('inactive')
    },
  })

  // Alert
  $('.alert .close').click(function (e) {
    e.stopPropagation()
    e.preventDefault()
    $(this).parent().fadeOut()
  })
})(jQuery)

const upload_button = $('#upload-button')
const filename = $('#resume-filename')
const remove_file = $('#remove-file')
const file_warn = $('#file-warn')
const resume_file = $('#resume-file')

upload_button.on('click', function (event) {
  event.preventDefault()
  resume_file.click()
})

resume_file.on('change', function () {
  if (resume_file.val() && /(\.(pdf|doc|docx))$/.test(resume_file.val())) {
    filename.html(resume_file.val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1])
    file_warn.hide()
    file_warn.html('')
    upload_button.hide()
    remove_file.show()
  } else {
    file_warn.html('Please choose a .pdf, .doc or .docx file')
    file_warn.show()
  }
})

remove_file.on('click', function () {
  resume_file.val('')
  filename.html('')
  upload_button.show()
  file_warn.hide()
  remove_file.hide()
  file_warn.html('')
})
