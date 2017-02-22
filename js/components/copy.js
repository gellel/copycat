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


	static HTML (config) {

		config = config instanceof Object ? config : {};

		let e = document.createElement('article');

		e.setAttributes({'data-extension-component':'copycat-copy'});

		e.insertNode('div', {'data-grid-assign':'padding','class':'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div',  {'data-grid-assign':'padding','class':'lp-xs-10 rp-xs-10'}, function (d) {
				d.insertNode('div', {'data-component-structure':'content-frame'}, function (d) {
					d.insertNode('div', {'data-component-section':'copycat-copy-main'}, function (d) {
						d.insertNode('div', {'data-component-structure':'content-frame'}, function (d) {
							d.insertNode('hgroup', {'data-component-section':'copycat-copy-head'}, function (h) {
								h.insertNode('h3', {'data-component-section':'copycat-copy-title'}, function (h) {
									h.insertNode('span', {'class':'font-xs-6'}, function (s) {
										s.insertNode('span', (config.title ? config.title : 'add title'));
									});
								});
							});
							d.insertNode('p', {'data-component-section':'copycat-copy-text'}, function (p) {
								p.insertNode('span', {'class':'font-xs-8 line-xs-14'}, function (s) {
									s.insertNode('span', (config.text ? config.text : 'content is empty.'), {'data-component-section':'copycat-copy-str'});
								});
							});
						});
						d.insertNode('div', {'data-component-structure':'content-frame'}, function (d) {
							d.insertNode('div', {'data-component-section':'copycat-copy-meta'}, function (d) {
								for (let key in (config.meta = config.meta instanceof Object ? config.meta : {}))
									d.insertNode('span', key);
							});
						});
					});	
				});
			});
		});	

		return e;
	}

	get sections () {
		for (var i = 0, s = {}, e = this.HTML.querySelectorAll('[data-component-section]'); i < e.length; i++)	
			Object.assign(s, {[e[i].getAttribute("data-component-section").split('-').join('')]: e[i]});

		return s;
	}

	constructor (config) {
		for (let key in config)
			if (config.hasOwnProperty(key))
				this[key] = config[key];

		this.HTML = Copy.HTML(this);
	}
}