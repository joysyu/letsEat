var order = undefined
var password = "0123"

$(document).on("click", ".login.button", function(evt) {
	order = undefined
	$('.ui.modal').modal('show');
});

$(document).on("click", '.circular.ui.icon.button', function(evt) {
	console.log(evt.target.id)
	if (order == undefined) {
		order = evt.target.id
	} else {
		order += evt.target.id
	}

	if (order.length == 4) {
		console.log("ORDER", order)
		if (order == password) {
			window.location.href='index.html';
		} else {
			order = undefined
		}
	}
});