// Dragging globals
var MOVE_IMAGE = null


$(document).ready(function() {

})


$(document).on('mousedown', function(evt) {
	evt.preventDefault();
	console.log(evt.target);

	if (evt.target.classList.contains('food-image')) {
		MOVE_IMAGE = $('#' + evt.target.id);
		MOVE_IMAGE.css('zIndex', 30);
		MOVE_IMAGE.css('pointer-events', 'none');

		if (!MOVE_IMAGE.attr('original-left') && !MOVE_IMAGE.attr('original-top')) {
			MOVE_IMAGE.attr('original-left', evt.pageX)
			MOVE_IMAGE.attr('original-top', evt.pageY)
		}

	}

});


$(document).on('mousemove', function(evt) {
	evt.preventDefault();

	if (MOVE_IMAGE) {
		// MOVE_IMAGE.css('left', evt.pageX - ORIGINAL_LEFT);
  //   	MOVE_IMAGE.css('top', evt.pageY - ORIGINAL_TOP);

  		MOVE_IMAGE.css('left', evt.pageX - MOVE_IMAGE.attr('original-left'));
  		MOVE_IMAGE.css('top', evt.pageY - MOVE_IMAGE.attr('original-top'));

	}
});


$(document).on('mouseup', function(evt) {
	evt.preventDefault();

	if (MOVE_IMAGE) {
		if (evt.target.id === 'plate-image') {
			// TODO: put it on the plate, decrement that food icon's counter, etc.
		}

		else {
			MOVE_IMAGE.animate({	// TODO: do these need to be something different?
				top: 0,
				left: 0
			})
			// ORIGINAL_LEFT = null;
  	// 		ORIGINAL_TOP = null;
		}

		MOVE_IMAGE.css('pointer-events', 'auto');
	}

	MOVE_IMAGE = null;

});