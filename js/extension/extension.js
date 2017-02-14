/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


class Extension {

	static get browser () {
		return window.browser ? browser : chrome;
	}

	static get manifest () {
		return Extension.browser.runtime.getManifest();
	}

	static article (parent, copy) {

		parent = parent instanceof HTMLElement ? parent : document.body;

		copy = copy instanceof Object ? copy : {meta: {}};

		// Structure.
		parent.insertNode('div', {class:'bm-xs-4', style:'background: white; box-shadow: 0rem 4.5rem 4.0rem -4.5rem rgba(0, 0, 0, 0.25);'}, function (div) {
			// Padding.
			div.insertNode('div', {class:'tp-xs-6 rp-xs-12 bp-xs-6 lp-xs-12'}, function (div) {

				// Main copied text.
				div.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (div) {
					div.insertNode('p', {class:'font-xs-6 font-align-justify line-xs-12'}, function (p) {
						p.insertNode('span', copy.text, { style: 'color: #232323; letter-spacing: 0.035rem; word-spacing: 0.1rem;' });
					});
				});

				// Page description.
				div.insertNode('div', { class: 'tp-xs-6 bp-xs-6' }, function (div) {
					div.insertNode('p', { class: 'font-xs-4 font-style-italic line-xs-8' }, function (p) {
						p.insertNode('span', (copy.meta.description ? copy.meta.description : 'This site does not have a description. Feel free to add your own.'), { style: 'color: #232323; letter-spacing: 0.035rem; word-spacing: 0.1rem;' });
					});
				});
			});
		});
	}

};

