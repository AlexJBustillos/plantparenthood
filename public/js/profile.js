var wateringCalendar = document.getElementById('wateringCalendar');

if(wateringCalendar) {
	wateringCalendar.valueAsDate = new Date();
}

$('.dropdown').dropdown({ transition: 'drop' });