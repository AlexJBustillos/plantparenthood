var wateringCalendar = document.getElementById('wateringCalendar');

if(wateringCalendar) {
	wateringCalendar.valueAsDate = new Date();
}

// Semantic UI
$('.ui.rating')
  .rating()
;

$('.dropdown').dropdown({ 
	transition: 'slide down', 
	fullTextSearch: true,
	sortSelect: true, 
	match: 'text'
});

// Responsive Navbar
$(".nav-hamburger").click(function(event){
	event.preventDefault();
	$(".nav-responsive").toggle("blind", 500);
});

// The below 2 functions hide the dropdown if it is expanded when the screen is small, but then the user makes their screen large 
$(window).resize(function(){
    checkSize();
});

function checkSize(){
    if ($(".nav-hamburger").css("display") == "none" ){
        $(".nav-responsive").hide();
    }
}