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

	static get HTML () {

		let e = document.createElement('article').setAttributes({'data-component-name':'copycat-copy'});

		e.insertNode('div', {'data-grid-assign':'padding','class':'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div',  {'data-grid-assign':'padding','class':'lp-xs-8 rp-xs-8'}, function (d) {
				d.insertNode('div', {'data-component-section':'copycat-copy-frame'}, function (d) {
					d.insertNode('div', {'data-component-section':'copycat-copy-main'}, function (d) {
						d.insertNode('div', {'data-component-section':'copycat-copy-selection'}, function (d) {
							d.insertNode('p').insertTextNode('hello');
						});
						d.insertNode('div', {'data-component-section':'copycat-copy-meta'}, function (d) {
							d.insertNode('p').insertTextNode('hello')
						});
					});	
				});
			});
		});

		return e;
	}

	constructor (config) {
		for (let key in (config = config instanceof Object ? config : {}))
			if (config.hasOwnProperty(key))
				this[key] = config[key];

	}
}