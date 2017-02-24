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
		return document.createElement('div').insertNode('div', {'data-copy-section':'frame-base'}, function (d) {
			d.insertNode('div', {'data-grid-assign':'padding', class:'tp-xs-6 bp-xs-6'}, function (d) {
				d.insertNode('div', {'data-grid-assign':'padding', class:'lp-xs-9 rp-xs-9'}, function (d) {
					d.insertNode('div', {'data-copy-section':'content-frame'}, function (d) {
						d.insertNode('p', {class:'font-xs-8 font-weight-700'}, function (p) {
							p.insertNode('span', {class:'line-xs-10'}, function (s) {
								s.insertNode('span', {'data-section':'', 'data-section-name':'copy-text', 'data-section-method':'SetCopyText'});
							});
						});
					});
				});
			});
		});	
	}

	static SetCopyText (element, string) {
		element.insertTextNode(string);
	}


	get sections () {
		for (var i = 0, s = {}, e = this.shadowRoot.querySelectorAll('[data-section]'); i < e.length; i++)
			Object.assign(s, {[e[i].getAttribute('data-section-name').split('-').map(
				function (str) {return str.toCapitalCase();}).join('')]:e[i]});

		return s;
	}

	set properties (props) {
		let s = this.sections;

		for (let key in props)
			if (s.hasOwnProperty(key))
				if (s[key].dataset.sectionMethod && Copy[s[key].dataset.sectionMethod])
					Copy[s[key].dataset.sectionMethod](s[key], props[key]);

		return s;
	}

	constructor () {
		super();

		this.attachShadow({mode: 'open'});

		this.shadowRoot.appendChild(Copy.HTML);
	}
}