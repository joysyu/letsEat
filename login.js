var order = undefined
var password = "0123"

$(document).on("click", "#dora-login", function(evt) {
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
		window.location.href='index.html';
	}
});