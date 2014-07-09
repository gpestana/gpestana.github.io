/*
 * Some js to enhance the user experience
 */
 
$(function(){
	anchorScrol();
})

function anchorScrol(){
	$("a").click(
		function() {
			var id = $(this).attr('href');
     		$('html, body').animate({
        		scrollTop: $(id).offset().top - 20
     		}, 1000 );
 		});
}