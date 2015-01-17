!function ($) {

  $(function(){
    PlanInput.init();
    $('.selectpicker').selectpicker();
	$("[data-toggle=tooltip]").tooltip();
	$("[data-toggle=popover]")
      .popover()

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })
  })
}(window.jQuery)
