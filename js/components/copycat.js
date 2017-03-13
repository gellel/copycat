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
		console.log('%cA new CopyCat %c' + this.randomConnectVerb +' %conto the page!', 'font-style:italic;color:#dcdcdc;', 'font-weight:bold;color:#dcdcdc;', 'font-style:italic;color:#dcdcdc;');

		if (!this.firstChild.insertNode instanceof Function) return;

		this.firstChild.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
				d.insertNode('div', {}, function (d) {
					d.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
						d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
							d.insertNode('div', {}, function (d) {
								d.insertNode('hgroup', {}, function (g) {
									g.insertNode('h4', {}, function (h) {
										h.insertNode('span', {}, function (s) {
											s.insertNode('span', {
												'data-component-section':'', 
												'data-component-id':'title',
												'data-component-method':'format-title',
												'data-component-bind':''
											}, function (s) {
												s['format-title'] = function (title) {
													title = title.replace(/[^a-zA-Z\d\s!@#$%&\*\(\),\.?]/g, '').trim();

													this.removeTextNode().insertTextNode(
														title ? title : 'Meow! Copy is missing a title.');
												}
											});
										});
									});
									g.insertNode('h5', {}, function (h) {
										h.insertNode('span', {}, function (s) {
											s.insertNode('span', {});
										});
									});
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
		console.log('%cThe CopyCat %c' + this.randomDisconnectVerb +' %caway', 'font-style:italic;color:#dcdcdc;', 'font-weight:bold;color:#dcdcdc;', 'font-style:italic;color:#dcdcdc;');
	}

	constructor () {
		super();
	}
}



customElements.define('copycat-copy', CopyCat);
