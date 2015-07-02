
/****************************************************************************************************************
DEMO STICKY FOOTER SLIDE-IN
*****************************************************************************************************************/


(function(){
	//this function provides a safe version of console.log so we don't have to remove logs in prod
	function safelog(str){return typeof(console)!=='undefined' && console.log && console.log(str);}




	// determine whether to show the sticky on the current page
	function showOnThisPage(){
		var url = window.location.href;
		var path = window.location.pathname;
		if(url.match(/\.com/i) && path.match(/learn-/i)){ return true; } // US language catalog pages
		return false;
	}


	function prepare_demo_sticky_bottom(){
		safelog('the demo bottom slide-in is on');


		// build and place the sticky
		var sticky = document.createElement('div');
		sticky.id = 'sticky';

		/*****************************************************************************************
		EDIT THIS HTML TO CHANGE THE LOOK AND FEEL OF THIS sticky
		*****************************************************************************************/
		sticky.innerHTML = ''
			+'<div style="text-align:center; padding:10px; background:rgba(44,44,44,0.9); color:#fff; position:relative; font-size:14px; font-family: gothamlight;">'
			// +'<img src="/assets/menu-close-white.png" id="closesticky" style="position:absolute; right:10px; top:10px; width: 12px; height:12px;">'
			+'Try it for yourself'
			+'<svg width="15" height="15" style="vertical-align: middle; margin: 0px 0px 2px 5px;" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="4.75" style="stroke:none; fill:#fff;"></circle><polygon points="4.5,3 6.5,5 4.5,7 4,6.5 5.6,5 4,3.5" style="stroke:#333; stroke-width:0.5; stroke-linejoin:round; fill:#333;"></polygon></svg>'
			+'<a href="http://www.rosettastone.com/lp/opdemo2/" target="_blank" style="cursor:pointer; color:#fff; text-decoration:none; font-size: 12px; display: inline-block; margin-left:5px; padding: 5px; border:2px solid #269; border-radius:3px;" id="accept_sticky_button">TAKE THE FREE DEMO</a>'
			+'</div>';
		// start with the sticky really low offscreen just so it can be inserted into the dom and a height can be detemined
		sticky.setAttribute('style','position:fixed; left:0px; bottom:-500%; width:100%; z-index:10;');
		document.body.insertBefore(sticky, document.body.firstChild);
		// now that the sticky is in the document, it has a height that can be used to determine its starting position just underneath the viewport
		sticky.style.bottom = -sticky.offsetHeight+'px';

		



		// show the sticky when the time is right
		function showBottomSticky(){
			$(sticky).animate({'bottom':'0px'}, 'slow');
		}

		// hide the sticky when the close button is clicked
		function hideBottomSticky(){
			$(sticky).animate({'bottom':-sticky.offsetHeight+'px'}, 'slow');
		}


		// variables to handle the scrolling detection
		var html = document.getElementsByTagName('html')[0];
		var body = document.body;
		var target_height = document.getElementById('choosesub_form').getBoundingClientRect().top + window.scrollY;
		var sticky_hidden = true;

		// when we scroll, check whether to show the slide-in
		$(document).on('scroll',function(){

			// if we're far enough DOWN the page, show the sticky bottom slide-in
			if(body.scrollTop>target_height || html.scrollTop>target_height){
				if(sticky_hidden){
					showBottomSticky();
					sticky_hidden = false;
				}
			}

			// if we're far enough UP the page, hide the sticky slide-in
			else{
				if(!sticky_hidden){
					hideBottomSticky();
					sticky_hidden = true;
				}
			}
		});

	}


	// if we're on the right pages, prepare the demo slide-in at the bottom
	if(showOnThisPage()){
		prepare_demo_sticky_bottom();
	}

})();

