// Profile page
document.getElementById('wateringCalendar').valueAsDate = new Date();

$('.delete-plant').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'profile'; //Reloads the current page on success
	});
});

// Journal
$('.delete-journal').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'journal'; //Reloads the current page on success
	});
});

$('.edit-journal').on('submit', function(event) {
	event.preventDefault();
	$.ajax({
		url: $(this).attr('action'),
		method: 'PUT',
		data: {
			content: $('#content').val(),
			id: $('#journalId').val()
		}
	}).done(function(response){
		console.log("Got to the promise");
		window.location.href = '/users/journal';
	})
});

// Comments
$('.delete-comment').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'profile'; //Reloads the current page on success
	});
});
