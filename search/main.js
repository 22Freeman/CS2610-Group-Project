$(document).ready(function(){
  $('.ns-button').click(function(e){
    e.preventDefault();
    e.stopPropagation();

    var query = $('.ns-textinput').val();

    if (query === '') {
      $('.ns-textinput').addClass('error');
    }
      else {
      $('.ns-textinput').removeClass('error');
    }
  })
});
