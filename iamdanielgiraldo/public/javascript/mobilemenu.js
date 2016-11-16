

jQuery(document).ready(function($) {    //make filters hover behavior switch to tap/clcik on touch screens  
	console.log('this was executed');
	if (!$('html').hasClass('no-touch')) { //Execute code only on a touch screen device         
	//Show #filter1 drop-down and hide #filter2 drop-down if it was open        
		// $('nav').bind('touchstart', function(e) {          
		// 	$("nav ul.children").toggle();             
		// 	$("nav ul.children").css('display','none');            
		// 		e.stopPropagation(); //Make all touch events stop at the #filter1 container element         
		// 	});         //Show #filter2 drop-down and hide #filter1 drop-down if it was open        
		// $('#filter2').bind('touchstart', function(e) {          
		// 	$("#filter2 ul.children").toggle();             
		// 	$("#filter1 ul.children").css('display','none');            
		// 		e.stopPropagation(); //Make all touch events stop at the #filter2 container element         
		// 	});         
			$(document).bind('touchstart', function(e) {                
				$("nav ul.children").fadeOut(300); //Close filters drop-downs if user taps ANYWHERE in the page        
			});         
			$('nav ul.children').bind('touchstart', function(event){               
				event.stopPropagation(); //Make all touch events stop at the #filter1 ul.children container element         
			});         
			$("nav ul.children a").click(function () {   
				  console.log('this was executed: links');         
				$("nav ul.children").fadeOut(300); //Close filters drop-downs if user taps on any link in drop-down      
		});     
		} });

