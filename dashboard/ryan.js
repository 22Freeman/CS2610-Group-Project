(function($){

	// Defining our jQuery plugin

	$.fn.rf_image_box = function(prop){

		// Default parameters

		var options = $.extend({
			height : "300",
			width : "500",
			title:"JQuery Modal Box Demo",
			description: "Example of how to create a modal box.",
      images: "https://www.eclipsewebmedia.com/wp-content/uploads/placeholdit.gif",
			top: "20%",
			left: "30%",
		},prop);

		return this.click(function(e){
			add_block_page();
			add_popup_box();
			add_styles();

			$('.rf_image_box').fadeIn();
		});

		 function add_styles(){
			$('.rf_image_box').css({
				'position':'absolute',
				'left':options.left,
				'top':options.top,
				'display':'none',
				'height': options.height + 'px',
				'width': options.width + 'px',
				'border':'1px solid #fff',
				'box-shadow': '0px 2px 7px #292929',
				'-moz-box-shadow': '0px 2px 7px #292929',
				'-webkit-box-shadow': '0px 2px 7px #292929',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px',
				'background': '#f2f2f2',
				'z-index':'50',
			});
			$('.rf_image_close').css({
				'position':'relative',
				'top':'-25px',
				'left':'20px',
				'float':'right',
				'display':'block',
				'height':'50px',
				'width':'50px',
				'color': '#5bb75b',
			});
      $('.rf_image_button_like').css({
        'position' : 'relative',
        'float': 'right',
        'height': '30px',
        'width': '50px',
        'color': '#51A451',
        'font-size': '14px',

      });
                        /*Block page overlay*/
			var pageHeight = $(document).height();
			var pageWidth = $(window).width();

			$('.rf_image_block_page').css({
				'position':'absolute',
				'top':'0',
				'left':'0',
				'background-color':'rgba(0,0,0,0.6)',
				'height':pageHeight,
				'width':pageWidth,
				'z-index':'10'
			});
			$('.rf_image_inner_box').css({
				'background-color':'#fff',
				'height':(options.height - 50) + 'px',
				'width':(options.width - 50) + 'px',
				'padding':'10px',
				'margin':'15px',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px'
			});
		}

		 function add_block_page(){
			var block_page = $('<div class="rf_image_block_page"></div>');

			$(block_page).appendTo('body');
		}

		 function add_popup_box(){
			 var pop_up = $('<div class="rf_image_box"><a href="#" class="rf_image_close"><i class="fa fa-times fa-4x"></i></a><div class="rf_image_inner_box"><img src="https://www.eclipsewebmedia.com/wp-content/uploads/placeholdit.gif"></img><button class="rf_image_button_like" text="button"type="button">Like</button></div></div>');
			 $(pop_up).appendTo('.rf_image_block_page');

			 $('.rf_image_close').click(function(){
				$(this).parent().fadeOut().remove();
				$('.rf_image_block_page').fadeOut().remove();
			 });
		}

		return this;
	};
})(jQuery);
