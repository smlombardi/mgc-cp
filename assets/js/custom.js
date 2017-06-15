// Manually init the external panels

$(function () {
	$("body>[data-role='panel']")
		.panel();
	$("body>[data-role='header']")
		.toolbar();
});


var sign = function (number) {
	return number && number / Math.abs(number);
};


var mc = function (message, type) {
	if (!type)
		type = 'highlight';
	$('#miniconsole')
		.append($('<div />')
			.addClass('ui-state-' + type + ' ui-corner-all')
			.html(message));
};



/* popups */
$.mobile.document.on("click", ".clickable-area", function (evt) {
	var $self = $(evt.currentTarget),
		target = $self.attr('href'),
		transition = $self.data('transition');
	$(target)
		.popup("open", {
			x: evt.pageX,
			y: evt.pageY,
			transition: transition
		});
	evt.preventDefault();
});

$.mobile.document.on("click", '.problems-button', function (evt) {
	var $myTab = $(evt.currentTarget)
		.parents(":jqmData(role='tabs')")
		.eq(0);
	$myTab.tabs("option", "active", 0)
		.find('.ui-tabs-nav a')
		.removeClass('ui-btn-active');
	evt.preventDefault();
});

$.mobile.document.on("click", '.solutions-button', function (evt) {
	var $myTab = $(evt.currentTarget)
		.parents(":jqmData(role='tabs')")
		.eq(0);
	$myTab.tabs("option", "active", 1)
		.find('.ui-tabs-nav a')
		.removeClass('ui-btn-active');
	evt.preventDefault();
});



$('body')
	.pagecontainer({
		beforechange: function (event, ui) {

		}
	});
$(document)
	.on('pagecreate', function (e) {

		$(this)
			.find(":jqmData(role='ammeraal')")
			.ammeraal();

		// make flash video player if browser does not support native html5 video
		$('html')
			.not('.video')
			.find('.flowplayer')
			.each(function (index, el) {
				var $this = $(this),
					videoData = $this.data('videoData');
				flowplayer($this.attr('id'), "assets/swf/flowplayer-3.2.18.swf", {
					clip: {scaling: "fit",
						ratio: 0.5625
					},
					playlist: [videoData.flowPoster, {url: videoData.flowSrc, autoPlay: false}]
				});
				//$this.flowplayer({// supply the configuration
				//	swf: "assets/swf/flowplayer-3.2.18.swf"//,
				/*src: "assets/swf/flowplayer-3.2.18.swf",
				 playlist: [videoData.flowPoster, {url: videoData.flowSrc, autoPlay: false}],
				 // set an event handler in the configuration
				 onFinish: function () {
				 windows.console && console.log("Video Finished");
				 },
				 onBeforeLoad:function(){
				 windows.console && console.log("Video onBeforeLoad");
				 },
				 onError:function(errorCode,errorMessage){
				 window.console && console.log({errorCode:errorCode,errorMessage:errorMessage});
				 }*/
				//});

			});


		$(document)
			.on("pageshow", function (pe) {
				// mc('<pre>' + JSON.stringify(pe, null, 2) + '</pre>');
				// ponemos los problemas en su sitio, adaptados al tamaño de la pantalla
				$('video')
					.each(function (index, element) {
						// @TODO pause the flowplayer also
						element.pause && element.pause();
					});
				$('.ui-page-active .problem-window li')
					.each(function (index, element) {
						var $this = $(this),
							mypos = {
								x: parseInt($this.data('x')),
								y: parseInt($this.data('y'))
							},
						wHeight = $(window)
							.height() - 120,
							wWidth = $(window)
							.width() - 30,
							mTop, mLeft;

						if (Math.abs(mypos.y) < (wHeight / 2 - 120)) {
							mTop = mypos.y + 'px';
						} else {
							mTop = sign(mypos.y) * (wHeight / 2 - 120) + 'px';
						}
						if (mypos.x < (-wWidth / 2)) {
							mLeft = -wWidth / 2 + 'px';
						} else if (mypos.x > (wWidth / 2) - 270) {
							mLeft = (wWidth / 2) - 270 + 'px';
						} else {
							mLeft = mypos.x + 'px';
						}

						$this.css({
							marginTop: mTop,
							marginLeft: mLeft});
					})
					.draggable({handle: '.handle'});
			});


		$('body')
			/**
			 * 
			 * @param {Event} event
			 * @param {object} ui {
			 *	toPage:jQuery | String
			 *	prevPage: jQuery
			 *	options: jQuery
			 *	}
			 * @returns {undefined}
			 */
			.on("pagecontainerbeforechange", function (event, ui) {
				// window.console && console.log(ui);
				var found = false, i = 0;
				do {
					var api = flowplayer(i);
					if (api) {
						api.pause();
						i++;
					} else {
						found = true;
					}
				} while (!found)
			});

	});



