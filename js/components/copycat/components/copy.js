/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class CopyCat extends CopyCatComponent {

	onConnect () {
	
		if (!this.componentAppStructured())
			this.deconstructor();

		this.componentAppAnchor.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
				d.insertNode('div', {}, function (d) {
					d.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
						d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
							d.insertNode('div', {class:'bm-xs-6'}, function (d) {
								d.insertNode('hgroup', {}, function (g) {
									g.insertNode('h4', {class:'bm-xs-2'}, function (h) {
										h.insertNode('span', {class:'font-xs-8'}, function (s) {
											s.insertNode('span', {class:'line-xs-10'}, function (s) {
												s.insertNode('d', {'data-component-section':'', 'data-component-bind':'', 
													'data-component-id':'title', 'data-component-method':'format-component-title'}, function (d) {
														d['format-component-title'] = function (title) {
															this.removeTextNode().insertTextNode(
																title.replace(/[^a-zA-Z\d\s\.,\?"'\(\)&$#@!]/g, ''));
														};
												});
											});
										});
									});
									g.insertNode('h5', {class:'bm-xs-0'}, function (h) {
										h.insertNode('span', {class:'font-xs-7'}, function (s) {
											s.insertNode('span', {class:'line-xs-10'}, function (s) {
												s.insertNode('d', {'data-component-section':'', 'data-component-bind':'', 
													'data-component-id':'tab', 'data-component-method':'format-component-source'}, function (d) {
														d['format-component-source'] = function (config) {

															let host = config.host;

															let substitute = [config.protocol, /www./g, /:\/\//g];

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
												s.insertNode('d', {'data-component-section':'', 'data-component-bind':'',
													'data-component-id':'text', 'data-component-method':'format-component-text'}, function (d) {
														d['format-component-text'] = function (config) {
															this.removeTextNode().insertTextNode(config);
														};
												});
											});
										});
									});
								});
							});
							d.insertNode('div', {class:'bm-xs-0'}, function (d) {
									
								d.insertNode('div', {class:'flex-xs dir-xs-row align-xs-stretch justify-xs-between'}, function (d) {
									
									d.insertNode('div', {
										'data-component-section':'', 'data-component-bind':'', 'data-component-id':'meta', 'data-component-method':'set-meta-tags'}, function (d) {
											d['set-meta-tags'] = function (meta) {
												if (customElements.get('copycat-meta'))
													this.appendChild(document.createElement('copycat-meta').addComponentAppProperties({text:'hello'}))
										};
									});

									d.insertNode('div', {class:'flex-xs dir-xs-row align-xs-center'}, function (d) {
										
									});
								});

						
							});
						});
					});
				});
			});
		});
				}

	constructor () {
		super();
	}
}



customElements.define('copycat-copy', CopyCat);
