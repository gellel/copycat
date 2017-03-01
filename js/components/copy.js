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
				d.insertNode('div', {'data-grid-assign':'padding', class:'lp-xs-6 rp-xs-6'}, function (d) {
					d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
						d.insertNode('div', {'data-grid-assign':'padding', class:'tp-xs-6 bp-xs-6'}, function (d) {
							d.insertNode('div', {'data-grid-assign':'padding', class:'lp-xs-9 rp-xs-9'}, function (d) {
								d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
									d.insertNode('hgroup', {class:'bm-xs-8'}, function (g) {
										g.insertNode('h3', {class:'font-xs-6 font-weight-bold'}, function (h) {
											h.insertNode('span', {class:'line-xs-10'}, function (s) {
												s.insertNode('span', 'Lorem Ipsum Dolor Set Amet Aqui. Qauestor Imperium And More.', 
													{'data-copycat-section':'', 'data-section-id':'title', 'data-method':'insert-string'});
											});
										});
										g.insertNode('h4', {class:'font-xs-5 font-weight-400'}, function (h) {
											h.insertNode('span', {class:'line-xs-8'}, function (s) {
												s.insertNode('span', '@Senate Latium', 
													{'data-copycat-section':'', 'data-section-id':'source', 'data-method':'insert-string'});
											});
										});
									});
									d.insertNode('p', {class:'font-xs-8 font-weight-400'}, function (p) {
										p.insertNode('span', {class:'line-xs-14'}, function (s) {
											s.insertNode('span', 
												{'data-copycat-section':'', 'data-section-id':'text', 'data-method':'insert-string'});
										});
									});
								});
								d.insertNode('hr', {'data-copy-section':'content-break'});

								d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
									d.insertNode('div', {'data-grid-assign':'flex', class:'flex-xs dir-xs-row'}, function (d) {
										d.insertNode('aside', {'data-meta-tag':'','data-meta-key':'sample'}, function (a) {
											a.insertNode('div', {'data-grid-assign':'padding', class:'tp-xs-3 bp-xs-3'}, function (d) {
												d.insertNode('div', {'data-grid-assign':'padding', class:'lp-xs-6 rp-xs-6'}, function (d) {
													d.insertNode('div', {'data-grid-assign':'flex', class:'flex-xs dir-xs-row align-xs-center'}, function (d) {
														d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
															d.insertNode('p', {class:'font-xs-5 font-weight-400'}, function (p) {
																p.insertNode('span', {class:'line-xs-10'}, function (s) {
																	s.insertNode('span', 'dank memes');
																});
															});
														});
														d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
															d.insertNode('div', {'data-grid-assign':'flex', class:'flex-xs dir-xs-row align-xs-center'}, function (d) {
																d.insertSvgNode('svg', {width:'10',height:'10'});
															});
														});
													});
												});
											});
										});
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
		for (var i = 0, s = {}, e = this.querySelectorAll('[data-copycat-section]'); i < e.length; i++)
			Object.assign(s, {[e[i].getAttribute('data-section-id')]:e[i]});

		return s;
	}

	set properties (props) {
		let s = this.sections;

		for (let key in props)
			if (s.hasOwnProperty(key))
				if (s[key].dataset.method && this[s[key].dataset.method])
					this[s[key].dataset.method](s[key], props[key], (s[key].dataset.args ? JSON.parse(s[key].dataset.args) : {}));

		return s;
	}


	['insert-string'] (element, string, args) {
		element.removeTextNode().insertTextNode(string);
	}

	['insert-meta'] (element, meta, args) {
		
	}

	connectedCallback () {
		this.appendChild(Copy.HTML);
	}

	constructor () {
		super();
	}
}