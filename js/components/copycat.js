/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class CopyCat extends HTMLComponent {

	get onConnectVerbs () {
		return ['pounces', 'jumps', 'walks', 'leaps', 'falls', 'lands'];
	}

	get onDisconnectVerbs () {
		return ['scurries', 'runs', 'leaps', 'hides'];
	}

	get randomConnectVerb () {
		return this.onConnectVerbs[Math.floor(Math.random() * this.onConnectVerbs.length)];
	}

	get randomDisconnectVerb () {
		return this.onDisconnectVerbs[Math.floor(Math.random() * this.onDisconnectVerbs.length)];
	}

	onConnect () {
		console.log('%cA new CopyCat %c' + this.randomConnectVerb +' %conto the page!', 
			'font-style:italic;color:#dcdcdc;', 'font-weight:bold;color:#dcdcdc;', 'font-style:italic;color:#dcdcdc;');

		if (!this.firstChild.insertNode instanceof Function) return;

		this.firstChild.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
				d.insertNode('div', {}, function (d) {
					d.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
						d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
							d.insertNode('div', {class:'bm-xs-6'}, function (d) {
								d.insertNode('hgroup', {}, function (g) {
									g.insertNode('h4', {class:'bm-xs-2'}, function (h) {
										h.insertNode('span', {class:'font-xs-8'}, function (s) {
											s.insertNode('span', {class:'line-xs-10'}, function (s) {
												s.insertNode('component-data-aside', {
													'data-component-section':'',
													'data-component-id':'title',
													'data-component-method':'format-component-title',
													'data-component-bind':''
												}, function (c) {
													c['format-component-title'] = function (title) {
														this.removeTextNode().insertTextNode(
															title.replace(/[^a-zA-Z\d\s\.,?"'\(\)&$#@!]/g, ''));
													};
												});
											});
										});
									});
									g.insertNode('h5', {class:'bm-xs-0'}, function (h) {
										h.insertNode('span', {class:'font-xs-7'}, function (s) {
											s.insertNode('span', {class:'line-xs-10'}, function (s) {
												s.insertNode('component-data-aside', {
													'data-component-section':'',
													'data-component-id':'tab',
													'data-component-method':'format-component-source',
													'data-component-bind':''
												}, function (c) {
													c['format-component-source'] = function (config) {

														let substitute = [config.protocol, /www./g, /:\/\//g];

														let host = config.host;

														for (let i = 0, l = substitute.length; i < l; i++)
															host = host.replace(substitute[i], '');

														this.removeTextNode().insertTextNode('@'+host);
													};
												});
											});
										});
									});
								});
							});
							d.insertNode('div', {class:'bm-xs-6'}, function (d) {
								d.insertNode('article', {}, function (a) {
									a.insertNode('p', {class:'font-xs-8'}, function (p) {
										p.insertNode('span', {class:'font-weight-400'}, function (s) {
											s.insertNode('span', {class:'line-xs-12'}, function (s) {
												s.insertNode('component-data-aside', {
													'data-component-section':'',
													'data-component-id':'text',
													'data-component-method':'format-component-text',
													'data-component-bind':''
												}, function (c) {
													c['format-component-text'] = function (config) {
														this.removeTextNode().insertTextNode(config);
													};
												});
											});
										});
									});
								});
							});
							d.insertNode('div', {class:'bm-xs-0'}, function (d) {
								d.insertNode('aside', {}, function (a) {
									a.insertTextNode('hi');
								});
							});
						});
					});
				});
			});
		});
			
		this.propagateProperties();
	}

	onDisconnect () {
		console.log('%cThe CopyCat %c' + this.randomDisconnectVerb +' %caway', 
			'font-style:italic;color:#dcdcdc;', 'font-weight:bold;color:#dcdcdc;', 'font-style:italic;color:#dcdcdc;');
	}

	constructor () {
		super();
	}
}



customElements.define('copycat-copy', CopyCat);
