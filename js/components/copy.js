/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Copy {

	static get frame () {

		return document.createElement('article').setAttributes({'data-app-section':'copycat-copy'}).insertNode('div', {'data-grid-assign':'padding', 'class':'tp-xs-6 bp-xs-6'}, function (div) {
			div.insertNode('div',  {'data-grid-assign':'padding', 'class':'lp-xs-8 rp-xs-8'}, function (div) {
				div.insertNode('div', {'data-copycat-section':'copy-frame'});
			});
		});
	}

	constructor (config) {
		for (let key in (config = config instanceof Object ? config : {}))
			if (config.hasOwnProperty(key))
				this[key] = config[key];
	}
}