var order = undefined
var password = "0123"

$(document).on("click", ".login.button", function(evt) {
	order = undefined
	$('.ui.modal').modal('show');
});

$(document).on("click", '.circular.ui.icon.button', function(evt) {
	var button_id = evt.target.id
	console.log(button_id)
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