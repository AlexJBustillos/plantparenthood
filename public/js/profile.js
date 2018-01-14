var wateringCalendar = document.getElementById('wateringCalendar');

if(wateringCalendar) {
	wateringCalendar.valueAsDate = new Date();
}

// Semantic UI
$('.ui.rating')
  .rating()
;

$('.dropdown').dropdown({ 
	transition: 'drop', 
	fullTextSearch: true,
	sortSelect: true, 
	match:'text'
});
