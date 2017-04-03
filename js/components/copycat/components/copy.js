/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Copy extends CopyCat {

	propagateStructure () {
		(function (self, b){
			b.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
				d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
					d.insertNode('div', {}, function (d) {
						d.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
							d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
								d.insertNode('div', {}, function (d) {
									d.insertNode('div', {class:'bm-xs-6'}, function (d) {
										d.insertNode('hgroup', {}, function (h) {
											h.insertNode('h4', {class:'bm-xs-2'}, function (h) {
												h.insertNode('span', {class:'font-xs-8 font-weight-500 font-break-word'}, function (s) {
													s.insertNode('span', {class:'line-xs-10'}, function (s) {
														s.insertNode('i', {['data-component-section']:'',
															['data-component-id']:'title',
															['data-component-method']:'set-title-text',
															['data-component-bind']:''}, function (i) {
																i['set-title-text'] = function (title) {
																	this.removeTextNode().insertTextNode(title.replace(/_/g, ' ').replace(/[^a-zA-Z\d\s\.,\?"'\(\)&$#@!]/g, '').replace(/\s\s+/g, ' '));
																};
															});
													});
												});
											});
											h.insertNode('h5', {class:'bm-xs-0'}, function (h) {
												h.insertNode('span', {class:'font-xs-7 font-weight-500 font-break-word'}, function (s) {
													s.insertNode('span', {class:'line-xs-10'}, function (s) {
														s.insertNode('i', {['data-component-section']:'',
															['data-component-id']:'tab',
															['data-component-method']:'set-source-text',
															['data-component-bind']:''}, function (i) {
																i['set-source-text'] = function (tab) {
																	this.removeTextNode().insertTextNode(['@', tab.host].join('').replace(/http:\/\/|https:\/\/|w{3}\.{1}/g, ''));
																};
															});
													});
												});
											});
										});
									});
									d.insertNode('div', {class:'bm-xs-6'}, function (d) {
										d.insertNode('article', {}, function (a) {
											a.insertNode('p', {class:'bm-xs-0'}, function (p) {
												p.insertNode('span', {class:'font-xs-8 font-weight-400 font-break-word'}, function (s) {
													s.insertNode('span', {class:'line-xs-10'}, function (s) {
														s.insertNode('i', {['data-component-section']:'',
															['data-component-id']:'text',
															['data-component-method']:'set-copy-text',
															['data-component-bind']:''}, function (i) {
																i['set-copy-text'] = function (text) {
																	this.removeTextNode().insertTextNode(text);
																};
															});
													});
												});
											});
										});
									});
									d.insertNode('div', {class:'bm-xs-0'}, function (d) {
										d.insertNode('aside', {}, function (a) {
											a.insertNode('div', {class:'flex-xs dir-xs-row align-xs-stretch'}, function (d) {
												d.insertNode('div', {class:'flex-xs dir-xs-row align-xs-center wrap-xs-wrap', 
													['data-component-section']:'',
													['data-component-id']:'meta',
													['data-component-method']:'set-meta-tag', 
													['data-component-bind']:''}, function (d) {
														d['set-meta-tag'] = function (meta) {
															if (customElements.get('copycat-meta'))
																for (let key in meta)
																	this.appendChild(
																		document.createElement('copycat-meta').addComponentAppProperties({meta:meta[key]}));
													}
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
		})(this, this.componentAppAnchor);
	}

	constructor () {
		super();
	}
}

customElements.define('copycat-copy', Copy);
