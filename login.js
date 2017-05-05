var order = undefined
var password = "0123"
var user = ''

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    console.log(ca)
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

$(document).on("click", ".login.button", function(evt) {
	order = undefined
	user = this.id
	$('.ui.modal').modal('show');
	$('#username').html(user);
});

$(document).on("click", '.circular.ui.icon.button', function(evt) {

	var x = getCookie('username')
		if (x) {
			console.log(x)
		} else {
			console.log("nope")
		}

	var button_id = evt.target.id
	$('#' + button_id).css({'background': 'red'})
	$('#' + button_id).prop('disabled', true);
	if (order == undefined) {
		$('#wrong-password').html("");
		order = evt.target.id
	} else {
		order += evt.target.id
	}

	if (order.length == 4) {
		if (order == password) {
			$('.circular.ui.icon.button').css({'background': 'green'})
			setCookie('username', user, 1)
			setTimeout(function () {
				window.location.href='index.html';
			}, 500)
		} else {
			order = undefined
			$('#wrong-password').html("<span> Wrong password! Please try again! </span>");
			$('.circular.ui.icon.button').css({'background': ''})
			$('.circular.ui.icon.button').prop('disabled', false)
		}
	}
});