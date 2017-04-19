// Dragging globals
var MOVE_IMAGE = null

var IMAGE_NUM = 0;

var fatCount = 2;
var dairyCount = 3;
var vegCount = 5;
var carbCount = 4;
var fruitCount = 3;

var starsToAdd = 0;

var stars = 100;
$(document).ready(function() {
	refreshStars();
	refreshCounts();
});

$(document).on('click', '#hatButton', function() {
	console.log("click HAT ", stars);
	if (stars >= 40) {
		stars = stars - 40;
		refreshStars();
		$("#petDiv").append("<div id='hatDiv'><img id='hatImg' class='ui small image' src='graphics/hat.png'></div>");
		$(".progress").progress('increment');
	}
})

$(document).on('click', '#boneButton', function() {
	console.log("CLICK BONE ", stars);
	if (stars >= 20) {
		stars = stars - 20;
		refreshStars();
		$("#petDiv").append("<div id='boneDiv'><img id='boneImg' class='ui small image' src='graphics/bone.png'></div>");
		$(".progress").progress('increment');
	}
})

$(document).on('click', '#sunglassesButton', function() {
	console.log("click GLASSES ", stars);
	if (stars >= 30) {
		stars = stars - 30;
		refreshStars();
		$("#petDiv").append("<div id='sunglassesDiv'><img id='sunglassesImg' class='ui small image' src='graphics/sunglasses.png'></div>");
		$(".progress").progress('increment');
	}
})

$(document).on('click', '#bowtieButton', function() {
	console.log("click BOWTIE ", stars);
	if (stars >= 50) {
		stars = stars - 50;
		refreshStars();
		$("#petDiv").append("<div id='bowtieDiv'><img id='bowtieImg' class='ui small image' src='graphics/bowtie.png'></div>");
		$(".progress").progress('increment');
	}
})


function refreshStars() {
	$("#starText").html(stars);
}

function refreshCounts() {
	$("#fatsCount").html(fatCount);
	$("#dairCount").html(dairyCount);
	$("#veggCount").html(vegCount);
	$("#carbCount").html(carbCount);
	$("#fruiCount").html(fruitCount);
}

$(document).on('click', function(e){
	if (e.target.id == "saveButton"){
		console.log("saveButton");
		stars += starsToAdd;
		console.log(starsToAdd)
		console.log(stars);
		refreshStars();
	}
});


$(document).on('mousedown', function(evt) {
	evt.preventDefault();

	if (evt.target.classList.contains('food-image')) {

		id = evt.target.id.slice(0,4); // should be fats, carb, dair, frui, or vegg
		MOVE_IMAGE_DIV = $('#' + id + '-icon-div');
		imageSrc = id + ".png";

		//MOVE_IMAGE_DIV = $('#' + evt.target.id + '-div');
		MOVE_IMAGE = $('#' + evt.target.id);


		MOVE_IMAGE.css('zIndex', 30);
		MOVE_IMAGE.css('pointer-events', 'none');

		IMAGE_NUM += 1;

		toAppend = "<img id =" + id + IMAGE_NUM.toString() + ' ' + "class='ui small image food-image' src='" + imageSrc +"' style='top: 0; left: 0; position: absolute;'>";

		MOVE_IMAGE_DIV.append(toAppend);

		// MOVE_IMAGE.css('height', '10%');
		// MOVE_IMAGE.css('width', 'auto');

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

			console.log(MOVE_IMAGE[0].id);

			if (MOVE_IMAGE[0].id == "fats-icon") {
				if (fatCount >= 1){
					fatCount -= 1;
				}
				starsToAdd += 5;
			} else if (MOVE_IMAGE[0].id == "dair-icon") {
				if (dairyCount >= 1){
					dairyCount -= 1;
				}
				starsToAdd += 5;
			} else if (MOVE_IMAGE[0].id == "vegg-icon") {
				if (vegCount >= 1){
					vegCount -= 1;
				}
				stars += 5;
			} else if (MOVE_IMAGE[0].id == "carb-icon") {
				if (carbCount >= 1){
					carbCount -= 1;
				}
				starsToAdd += 5;
			} else if (MOVE_IMAGE[0].id == "frui-icon") {
				if (fruitCount >= 1){
					fruitCount -= 1;
				}
				starsToAdd += 5;
			}
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