console.log("Hello from router.js");

$('.delete-plant').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'profile'; //Reloads the current page on success
	});
});

$('.delete-comment').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'profile'; //Reloads the current page on success
	});
});

$('.delete-journal').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'journal'; //Reloads the current page on success
	});
});