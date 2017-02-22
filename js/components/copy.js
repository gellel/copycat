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


	get HTML () {

		let self = this;

		let e = document.createElement('article').setAttributes({'data-component-name':'copycat-copy'});

		e.insertNode('div', {'data-grid-assign':'padding','class':'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div',  {'data-grid-assign':'padding','class':'lp-xs-8 rp-xs-8'}, function (d) {
				d.insertNode('div', {'data-component-section':'copycat-copy-frame'}, function (d) {
					d.insertNode('div', {'data-component-section':'copycat-copy-main'}, function (d) {
						d.insertNode('div', {'data-component-section':'copycat-copy-frame'}, function (d) {
							d.insertNode('p', self.text, {'data-component-section':'copycat-copy-text'})
						});
						d.insertNode('div', {'data-component-section':'copycat-copy-frame'}, function (d) {
							d.insertNode('div', {'data-component-section':'copycat-copy-meta'}, function (d) {
								for (let key in self.meta)
									d.insertNode('span', key)
							});
						});
					});	
				});
			});
		});	

		return e;
	}

	/*set sections (lol) {

		console.log("SEET SET")

		for (var i = 0, s = {}, c = this.HTML.querySelectorAll('[data-component-section]'), l = c.length; i < l; i++) {
			s[c[i].dataset.componentSection] = c[i];
		}

		return s;
	}*/

	constructor (config) {
		for (let key in config)
			if (config.hasOwnProperty(key))
				this[key] = config[key];

		console.log(this)
	}
}