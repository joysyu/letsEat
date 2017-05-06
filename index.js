// Dragging globals
var MOVE_IMAGE = null

var IMAGE_NUM = 0;

var idToCount = {'vegg':5, 'carb':3, 'frui':5, 'dair':4, 'fats':1}

var starsToAdd = 0;

var seenBefore = [];

var stars = 100;

var hasHat = 0;
var hasBone = 0;
var hasSunglasses = 0;
var hasBowtie = 0;


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function() {
	var cookieStars = getCookie('stars')
	if(cookieStars){
		stars = parseInt(cookieStars)
	}

	var cookieHat = getCookie('hasHat');
	if(cookieHat) {
		hasHat = parseInt(cookieHat);
	}

	var cookieBone = getCookie('hasBone');
	if(cookieBone) {
		hasBone = parseInt(cookieBone);
	}

	var cookieSunglasses = getCookie('hasSunglasses');
	if(cookieSunglasses) {
		hasSunglasses = parseInt(cookieSunglasses);
	}

	var cookieBowtie = getCookie('hasBowtie');
	if(cookieBowtie) {
		hasBowtie = parseInt(cookieBowtie);
	}

	var user = getCookie('username')
	if(user){
		$("#welcome-message").html('Welcome ' + user + '!')
	}
	refreshStars();
	refreshHasHat();
	refreshHasBone();
	refreshHasSunglasses();
	refreshHasBowtie();
});

$(document).on('click', '#hatButton', function() {
	console.log("click HAT ", stars);
	if (stars >= 40) {
		stars = stars - 40;
		refreshStars();
		$("#petDiv").append("<div id='hatDiv'><img id='hatImg' class='ui small image' src='graphics/hat.png'></div>");
		hasHat = 1;
		refreshHasHat();

		$(".progress").progress('increment');
	} else {
		starErrorMsg();
	}
})

$(document).on('click', '#boneButton', function() {
	console.log("CLICK BONE ", stars);
	if (stars >= 20) {
		stars = stars - 20;
		refreshStars();
		$("#petDiv").append("<div id='boneDiv'><img id='boneImg' class='ui small image' src='graphics/bone.png'></div>");
		hasBone = 1;
		refeshHasBone();

		$(".progress").progress('increment');
	} else {
		starErrorMsg();
	}
})

$(document).on('click', '#sunglassesButton', function() {
	console.log("click GLASSES ", stars);
	if (stars >= 30) {
		stars = stars - 30;
		refreshStars();
		$("#petDiv").append("<div id='sunglassesDiv'><img id='sunglassesImg' class='ui small image' src='graphics/sunglasses.png'></div>");
		hasSunglasses = 1;
		refreshHasSunglasses();

		$(".progress").progress('increment');
	} else {
		starErrorMsg();
	}
})

$(document).on('click', '#bowtieButton', function() {
	console.log("click BOWTIE ", stars);
	if (stars >= 50) {
		stars = stars - 50;
		refreshStars();
		$("#petDiv").append("<div id='bowtieDiv'><img id='bowtieImg' class='ui small image' src='graphics/bowtie.png'></div>");
		hasBowtie = 1;
		refreshHasBowtie();

		$(".progress").progress('increment');
	} else {
		starErrorMsg();
	}
})


function refreshStars() {
	setCookie('stars', stars, 1)

	$("#starText").html(stars);
}

function refreshHasHat() {
	setCookie('hasHat', hasHat, 1);
	console.log("refresh has hat ", hasHat);
	if (hasHat == 1) {
		$("#petDiv").append("<div id='hatDiv'><img id='hatImg' class='ui small image' src='graphics/hat.png'></div>");
	}
}

function refreshHasBone() {
	setCookie('hasBone', hasBone, 1);
	if (hasBone == 1) {
		$("#petDiv").append("<div id='boneDiv'><img id='boneImg' class='ui small image' src='graphics/bone.png'></div>");
	}
}

function refreshHasSunglasses() {
	setCookie('hasSunglasses', hasSunglasses, 1);
	if (hasSunglasses == 1) {
		$("#petDiv").append("<div id='sunglassesDiv'><img id='sunglassesImg' class='ui small image' src='graphics/sunglasses.png'></div>");
	}
}

function refreshHasBowtie() {
	setCookie('hasBowtie', hasBowtie, 1);
	if (hasBowtie == 1) {
		$("#petDiv").append("<div id='bowtieDiv'><img id='bowtieImg' class='ui small image' src='graphics/bowtie.png'></div>");
	}
}

function starErrorMsg() {
	$("#starsMsg").html("<span id='starSpan'>You do not have enough stars!</span>");
	setTimeout(function() {
		$("#starsMsg").empty();		

	}, 1000);
	console.log("ERROR MSG");
}

$(document).on('click', function(e){
	if (e.target.id == "saveButton") {

		// get rid of food images that overlap plate
		var rectPlate = $('#plate-image')[0].getBoundingClientRect();

		var foodImages = document.getElementsByClassName('food-image');
		for (i = 0; i < foodImages.length; i++) {
			var rectImage = foodImages[i].getBoundingClientRect();
			var overlap = !(rectPlate.right < rectImage.left || 
                			rectPlate.left > rectImage.right || 
			                rectPlate.bottom < rectImage.top || 
			                rectPlate.top > rectImage.bottom)
			if (overlap) {
				console.log(foodImages[i]);
				foodImages[i].style.visibility = "hidden";

				console.log("ID---", foodImages[i].id);
				if (!seenBefore.includes(foodImages[i].id)){
					stars += idToCount[foodImages[i].id.slice(0,4)];
					seenBefore.push(foodImages[i].id);
				}
			}
		}
		refreshStars();

	}

});


$(document).on('mousedown', function(evt) {
	evt.preventDefault();

	if (evt.target.classList.contains('food-image')) {

		var correctLeft = $('#' + evt.target.id).css('left')
		var correctTop = $('#' + evt.target.id).css('top')
		console.log(correctLeft);
		console.log(correctTop);

		id = evt.target.id.slice(0,4); // should be fats, carb, dair, frui, or vegg
		MOVE_IMAGE_DIV = $('#' + id + '-icon-div');
		imageSrc = "graphics/" + id + ".png";

		MOVE_IMAGE = $('#' + evt.target.id);


		MOVE_IMAGE.css('zIndex', 30);
		MOVE_IMAGE.css('pointer-events', 'none');

		IMAGE_NUM += 1;

		toAppend = "<img id =" + id + IMAGE_NUM.toString() + ' ' + "class='ui small image food-image' src='" + imageSrc +"' style='top: 0; left: 0; position: absolute'>";
		MOVE_IMAGE_DIV.append(toAppend);

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
			// console.log("stars to add before if block", starsToAdd);

			// if (MOVE_IMAGE[0].id.includes("fats")) {
			// 	starsToAdd += fatCount;
			// } else if (MOVE_IMAGE[0].id.includes("dair")) {
			// 	starsToAdd += dairyCount;
			// } else if (MOVE_IMAGE[0].id.includes("vegg")) {
			// 	starsToAdd += vegCount;
			// } else if (MOVE_IMAGE[0].id.includes("carb")) {
			// 	starsToAdd += carbCount;
			// } else if (MOVE_IMAGE[0].id.includes("frui")) {
			// 	starsToAdd += fruitCount;
			// }

			// console.log("stars to add after if block", starsToAdd);

		}


		else { // moves off plate
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