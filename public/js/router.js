console.log("Hello from router.js");

$('.delete-link').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'profile'; //Reloads the current page on success
	});
});