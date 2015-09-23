$(document).ready(function(){
  var IMAGE_DELAY = 3000;
  var FADEIN_SPEED = 1000;
  var FADEOUT_SPEED = 1000;
  var images = [".img-1",".img-2",".img-3", ".img-4"];
  var imagebubbles = ["#image-circle-1", "#image-circle-2", "#image-circle-3", "#image-circle-4"];

  function imageLoop(){
    $(imagebubbles[0]).removeClass(".fa fa-circle-o").addClass(".fa fa-circle");
    $(images[0]).fadeIn(FADEIN_SPEED).delay(IMAGE_DELAY).fadeOut(FADEOUT_SPEED, function(){
      $(imagebubbles[0]).removeClass(".fa fa-circle").addClass(".fa fa-circle-o");
      $(imagebubbles[1]).removeClass(".fa fa-circle-o").addClass(".fa fa-circle");
      $(images[1]).fadeIn(FADEIN_SPEED).delay(IMAGE_DELAY).fadeOut(FADEOUT_SPEED, function(){
        $(imagebubbles[1]).removeClass(".fa fa-circle").addClass(".fa fa-circle-o");
        $(imagebubbles[2]).removeClass(".fa fa-circle-o").addClass(".fa fa-circle");
        $(images[2]).fadeIn(FADEIN_SPEED).delay(IMAGE_DELAY).fadeOut(FADEOUT_SPEED, function(){
          $(imagebubbles[2]).removeClass(".fa fa-circle").addClass(".fa fa-circle-o");
          $(imagebubbles[3]).removeClass(".fa fa-circle-o").addClass(".fa fa-circle");
          $(images[3]).fadeIn(FADEIN_SPEED).delay(IMAGE_DELAY).fadeOut(FADEOUT_SPEED, function(){
            $(imagebubbles[3]).removeClass(".fa fa-circle").addClass(".fa fa-circle-o");
            imageLoop();
          });
        });
      });
    });
  }
  imageLoop();
});
