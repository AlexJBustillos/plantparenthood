// Profile page

$('.delete-plant').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'plants'; 
	});
});

// Journal
$('.delete-journal').click(function(event){
	event.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = 'journal'; 
	});
});

$('.edit-journal').on('submit', function(event) {
	event.preventDefault();
	$.ajax({
		url: $(this).attr('action'),
		method: 'PUT',
		data: {
			title: $('#title').val(),
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
		console.log("Got to the promise");
		window.location.reload(true);
	});
});
