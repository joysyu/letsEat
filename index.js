// Dragging globals
var MOVE_IMAGE = null

var IMAGE_NUM = 0;


var permittedServings = {'vegg':5, 'carb':2, 'frui':5, 'dair':2, 'prot':3}
var notPermittedServings = {'vegg':0, 'carb':0, 'frui':0, 'dair':0, 'prot':0}
var idToCount = {'vegg':null, 'carb':null, 'frui':null, 'dair':null, 'prot':null};
var servings = {'vegg': 3, 'carb': 6, 'frui': 3, 'dair': 2, 'prot': 2}

var starsToAdd = 0;

var seenBefore = [];

var currentlyOnPlate = [];

var stars = 100;

var hasHat = 0;
var hasBone = 0;
var hasSunglasses = 0;
var hasBowtie = 0;

var progress = 10;


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

	var cookieProgress = getCookie('progress');
	if(cookieProgress) {
		progress = parseInt(cookieProgress);
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
	refreshProgress();
	showTempStars();
});

$(document).on('click', '#hatButton', function() {
	console.log("click HAT ", stars);
	if (stars >= 40) {
		stars = stars - 40;
		refreshStars();
		$("#petDiv").append("<div id='hatDiv'><img id='hatImg' class='ui small image' src='graphics/hat.png'></div>");
		hasHat = 1;
		refreshHasHat();

		$(".progress").progress('increment', 10);
		progress = progress + 10;
		refreshProgress();
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
		refreshHasBone();

		$(".progress").progress('increment', 5);
		progress = progress + 5;
		refreshProgress();
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

		$(".progress").progress('increment', 8);
		progress = progress + 8;
		refreshProgress();
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

		$(".progress").progress('increment', 12);
		progress = progress + 12;
		refreshProgress();
	} else {
		starErrorMsg();
	}
})


function refreshStars() {
	setCookie('stars', stars, 1)
	$("#starText").html(stars);
}

function showTempStars() {
	$("#tempStars").html("+" + starsToAdd + "<img class='tiny ui image' src='graphics/star.jpeg' style='width:30%;'>");
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

function refreshProgress() {
	if ($(".progress").attr("data-percent") >= 100) {
		progress = 100;
	}

	setCookie('progress', progress, 1);

	$(".progress").progress({'percent': progress});
	console.log("progress ", progress);
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
				foodImages[i].style.visibility = "hidden";

				console.log("ID---", foodImages[i].id);
				if (!seenBefore.includes(foodImages[i].id)){
					console.log("IM ADDING TO PERMANENT STARS");
					//stars += idToCount[foodImages[i].id.slice(0,4)];
					console.log(stars);
					seenBefore.push(foodImages[i].id);
				}
			}
		}
		stars += starsToAdd;
		refreshStars();
		currentlyOnPlate = [];
		starsToAdd = 0;
		showTempStars();
	}

});


$(document).on('mousedown', function(evt) {
	evt.preventDefault();

	if (evt.target.classList.contains('food-image')) {

		$('#plate-image').css({'cursor': 'pointer'})

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

		toAppend = "<input type='image' id =" + id + IMAGE_NUM.toString() + ' ' + "class='ui small image food-image' src='" + imageSrc +"' style='top: 0; left: 0; position: absolute'>";
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

	$('#plate-image').css({cursor: ""})

	if (MOVE_IMAGE) {
		var moveImageFood = MOVE_IMAGE.attr('id').slice(0, 4);
		console.log(permittedServings)
		console.log(servings)
		if (evt.target.id === 'plate-image' || currentlyOnPlate.indexOf(evt.target.id) != -1) {
			// TODO: put it on the plate, decrement that food icon's counter, etc.

			//console.log(MOVE_IMAGE[0].id);

			// console.log("stars to add after if block", starsToAdd);
			if (!currentlyOnPlate.includes(MOVE_IMAGE[0].id)){
				// starsToAdd += idToCount[MOVE_IMAGE[0].id.slice(0,4)];
				// currentlyOnPlate.push(MOVE_IMAGE[0].id);

				if (servings[moveImageFood] <= 0) {
					console.log('blocking')
					idToCount[moveImageFood] = notPermittedServings[moveImageFood];
					//$('#' + moveImageFood + '-star').css({'visibility':'hidden'});
					$('#' + moveImageFood + '-star').html("<img style='height:5%; width: auto;' class='ui mini centered image' src='graphics/dailyServingCheck.png'> ");
				}
				else {
					console.log('allowing')
					idToCount[moveImageFood] = permittedServings[moveImageFood];
					$('#' + moveImageFood + '-star').css({'visibility':'visible'});
				}
				servings[moveImageFood] -= 1;
				starsToAdd += idToCount[MOVE_IMAGE[0].id.slice(0,4)];
				currentlyOnPlate.push(MOVE_IMAGE[0].id);
				showTempStars();

			}
		}


		else { // moves off plate
			//console.log(MOVE_IMAGE[0].id)
			if (currentlyOnPlate.includes(MOVE_IMAGE[0].id)){
				// starsToAdd -= idToCount[MOVE_IMAGE[0].id.slice(0,4)];
				// showTempStars();
				index = currentlyOnPlate.indexOf(MOVE_IMAGE[0].id)
				if (index > -1) {
    				currentlyOnPlate.splice(index, 1);
				}
				if (servings[moveImageFood] >= 0) {
					idToCount[moveImageFood] = permittedServings[moveImageFood];
					$('#' + moveImageFood + '-star').css({'visibility':'visible'});
				}
				else {
					idToCount[moveImageFood] = notPermittedServings[moveImageFood];
					$('#' + moveImageFood + '-star').css({'visibility':'hidden'});
				}

				servings[moveImageFood] += 1;
				starsToAdd -= idToCount[moveImageFood];
				showTempStars();				
			}
			MOVE_IMAGE.animate({	// TODO: do these need to be something different?
				top: 0,
				left: 0
			})

			// ORIGINAL_LEFT = null;
  	// 		ORIGINAL_TOP = null;
		}

		MOVE_IMAGE.css('pointer-events', 'auto');
		showTempStars();

	}

	MOVE_IMAGE = null;

});