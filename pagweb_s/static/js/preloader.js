$(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(500).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });