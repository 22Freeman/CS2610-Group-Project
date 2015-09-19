$(document).ready(function(){
	$( ".header-item" ).hover(
		function() {
			$(this).children(".header-item-underline").css({"visibility":"visible"});
    }
	);
  $( ".header-item" ).mouseleave(
    function() {
      $(this).children(".header-item-underline").css({"visibility":"hidden"});
    }
  );
});
