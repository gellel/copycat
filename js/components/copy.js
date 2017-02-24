/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Copy extends HTMLElement {

	static get HTML () {
		return document.createElement('div').insertNode('div', {'copycat-contents':''}, function (d) {
			d.insertNode('div', {'data-grid-assign':'padding', class:'tp-xs-6 bp-xs-6'}, function (d) {
				d.insertNode('div', {'data-grid-assign':'padding', class:'lp-xs-9 rp-xs-9'}, function (d) {
					d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
						d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
							d.insertNode('div', {'data-copy-section':'main'}, function (d) {
								d.insertNode('hgroup', {'data-copy-section':'content-group'}, function (g) {
									g.insertNode('h3', {class:'font-xs-6 font-weight-bold'}, function (h) {
										h.insertNode('span', {class:'line-xs-10'}, function (s) {
											s.insertNode('span', {'data-section':'', 'data-section-name':'title', 'data-method':'insert-string'});
										});
									});
									g.insertNode('h4', {class:'font-xs-4 font-weight-700'}, function (h) {
										h.insertNode('span', {class:'line-xs-8'}, function (s) {
											s.insertNode('span', 'lorem ipsum', {'data-section':'', 'data-section-name':'source'})
										});
									});
								});
								d.insertNode('p', {class:'font-xs-8 font-weight-400'}, function (p) {
									p.insertNode('span', {class:'line-xs-14'}, function (s) {
										s.insertNode('span', {'data-section':'', 'data-section-name':'text', 'data-method':'insert-string'});
									});
								});
							});
						});
					});
				});
			});
		});	
	}

	get sections () {
		for (var i = 0, s = {}, e = this.querySelectorAll('[data-section]'); i < e.length; i++)
			Object.assign(s, {[e[i].getAttribute('data-section-name')]:e[i]});

		return s;
	}

	set properties (props) {
		let s = this.sections;

		for (let key in props)
			if (s.hasOwnProperty(key))
				if (s[key].dataset.method && this[s[key].dataset.method])
					this[s[key].dataset.method](s[key], props[key]);

		return s;
	}

	['insert-string'] (element, string) {
		element.removeTextNode().insertTextNode(string);
	}

	['insert-meta'] (element, meta) {
		
	}

	connectedCallback () {
		this.appendChild(Copy.HTML);
	}

	constructor () {
		super();
	}
}