/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


Extension.port = Extension.browser.runtime.connect({ name: Extension.manifest.name });


Extension.port.postMessage({ event: 'popup_page_opened' });
	

Extension.port.onMessage.addListener(function (message, sender) {
	/**
	*** Manage event page connection.
	*
	* User opened browser extension popup page.
	* Sends copied array from event page to pop up page 
	* Response cleared after popup page is closed.
	*
	** Send message to event script.
	*
	* Message response must be object.
	* Message object contains popup page object argument.
	* Assumes content script is to find page data from active tab and highlighted text.
	*
	**/

	Extension.port.postMessage({ event: 'popup_page_reading_copies' });




	console.log(message.copies)
		
	document.body.insertNode('div', { class: 'tp-xs-6 rp-xs-6 bp-xs-6 lp-xs-6'}, function (div) {

		for (let i = 0, l = message.copies.length; i < l; i++) {

			div.insertNode('div', { class: 'col-xs-grow col-sm-10 rm-xs-auto bm-xs-4 lm-xs-auto', style: 'background: white; box-shadow: 0rem 4.5rem 4.0rem -4.5rem rgba(0, 0, 0, 0.25);' }, function (div) {

				div.insertNode('div', { class: 'tp-xs-6 rp-xs-12 bp-xs-6 lp-xs-12' }, function (div) {
		
					div.insertNode('div', { class: 'tp-xs-6 bp-xs-6' }, function (div) {
						div.insertNode('p', { class: 'font-xs-6 font-align-justify line-xs-12' }, function (p) {
							p.insertNode('span', message.copies[i].text, { style: 'color: #232323; letter-spacing: 0.035rem; word-spacing: 0.1rem;' });
						});
					});

					div.insertNode('div', { class: 'tp-xs-6 bp-xs-6' }, function (div) {
						div.insertNode('p', { class: 'font-xs-4 font-align-left font-style-italic line-xs-8' }, function (p) {
							p.insertNode('span', (message.copies[i].meta.description ? message.copies[i].meta.description : 'This site does not have a description. Feel free to add your own.'), { style: 'color: #232323; letter-spacing: 0.035rem; word-spacing: 0.1rem;' });
						});
					});

					div.insertNode('div', {}, function (div) {
						div.insertNode('aside', { class: 'flex-xs justify-xs-between'}, function (aside) {

							aside.insertNode('div', {class: 'flex-xs align-xs-center'}, function (div) {
								
								div.insertSvgNode('svg', {x: '0px', y:'0px', viewBox:'0 0 50 50', 'xml:space':'preserve', class: 'tp-xs-2 rp-xs-2 bp-xs-2 lp-xs-2', style:'width: 1.4rem; height: 1.4rem;'}, function (svg) {
										svg.insertSvgNode('path', { d: 'M24.9,47.7L8.2,32.6c-3.4-3-5.7-6.9-6.7-11.1c-0.7-2.9-0.5-4.7-0.4-5.1C1.8,8.5,7.4,2.8,14.3,2.8 c4.3,0,8.1,2.1,10.5,5.7c2.5-3.5,6.5-5.7,10.8-5.7c7,0,12.5,5.7,13.3,13.5c0.1,0.4,0.3,2.2-0.4,5.1c-1,4.2-3.3,8.1-6.7,11.1 L24.9,47.7z M4,16.8c0,0-0.2,1.4,0.4,4c0.9,3.6,2.8,7,5.8,9.6l14.7,13.3l15-13.4c2.9-2.6,4.9-5.9,5.7-9.6c0.6-2.5,0.4-4,0.4-4l0-0.1 c-0.6-6.3-4.9-10.8-10.3-10.8c-4.1,0-7.8,2.5-9.4,6.4l-1.4,3.3l-1.4-3.3c-1.7-3.9-5.2-6.4-9.1-6.4c-5.4,0-9.7,4.6-10.3,10.8L4,16.8 L4,16.8z', style: 'fill: #232323;'});
								});

								div.insertSvgNode('svg', {x: '0px', y:'0px', viewBox:'0 0 50 50', 'xml:space':'preserve', class: 'tp-xs-2 rp-xs-2 bp-xs-2 lp-xs-2', style:'width: 1.4rem; height: 1.4rem;'}, function (svg) {
										svg.insertSvgNode('path', { d: 'M39.3,32c-2.8,0-5.3,1.3-6.9,3.4L19,27.9c0.3-0.9,0.5-1.9,0.5-2.9c0-1-0.2-2-0.5-2.9l13.4-7.5 c1.6,2.1,4.1,3.4,6.9,3.4c4.8,0,8.7-3.9,8.7-8.7s-3.9-8.7-8.7-8.7s-8.7,3.9-8.7,8.7c0,1,0.2,2,0.5,2.9l-13.4,7.5 c-1.6-2.1-4.1-3.4-6.9-3.4C5.9,16.3,2,20.2,2,25s3.9,8.7,8.7,8.7c2.8,0,5.3-1.3,6.9-3.4l13.4,7.5c-0.3,0.9-0.5,1.9-0.5,2.9 c0,4.8,3.9,8.7,8.7,8.7s8.7-3.9,8.7-8.7S44.1,32,39.3,32z M39.3,3.3c3.3,0,6,2.7,6,6s-2.7,6-6,6c-3.3,0-6-2.7-6-6S36,3.3,39.3,3.3z M10.7,31c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S14,31,10.7,31z M39.3,46.7c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6c3.3,0,6,2.7,6,6 C45.3,44,42.6,46.7,39.3,46.7z', style: 'fill: #232323;' });
								});
							});

							aside.insertNode('div', {class: 'flex-xs- align-xs-center'}, function (div) {

								for (let j = 0, keywords = (typeof message.copies[i].meta.keywords === 'string' ? message.copies[i].meta.keywords.split(',') : []); j < keywords.length; j++) {

									console.log(keywords[j])
								}

							});

						});
					});
				});
			});
		}
	});
});

