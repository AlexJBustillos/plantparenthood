var wateringCalendar = document.getElementById('wateringCalendar');

if(wateringCalendar) {
	wateringCalendar.valueAsDate = new Date();
}

// Semantic UI
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

$(window).scroll(function() {
  var height = $(window).scrollTop();
  if(height  > 300) {
    $('.top').addClass('scrolling');
  }
  else {
    $('.top').removeClass('scrolling');
  }
});

$( document ).ready(function() {
  var alert = $(document).find('.alert-success, .alert-error');
  if (alert) {
    setTimeout(function(){ 
      $(alert).toggle("fade", 2000);
    }, 2000);
  }
});

