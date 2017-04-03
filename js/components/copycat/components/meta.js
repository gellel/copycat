/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Meta extends CopyCat {

	onPropertyMetaChange (meta) {
		typeof meta === 'string' ? 
			this.setAttribute('data-meta-key', meta) : 
			this.removeAttribute('data-meta-key');
	}

	propagateStructure (b) {
		(function (self, b) {
			b.insertNode('div', {class:'tp-xs-4 bp-xs-4'}, function (d) {
				d.insertNode('div', {class:'lp-xs-4 rp-xs-4'}, function (d) {
					d.insertNode('div', {}, function (d) {
						d.insertNode('div', {class:'tp-xs-0 bp-xs-0'}, function (d) {
							d.insertNode('div', {class:'lp-xs-0 rp-xs-0'}, function (d) {
								d.insertNode('div', {}, function (d) {
									d.insertNode('div', {class:'flex-xs dir-xs-row align-xs-stretch'}, function (d) {
										d.insertNode('div', {class:'flex-xs align-xs-center'}, function (d) {
											d.insertNode('hgroup', {}, function (h) {
												h.insertNode('h4', {}, function (h) {
													h.insertNode('span', {class:'font-xs-7 font-weight-500'}, function (s) {
														s.insertNode('span', {class:'line-xs-10'}, function (s) {
															s.insertNode('i', {['data-component-section']:'',
																['data-component-id']:'meta',
																['data-component-method']:'set-title-text',
																['data-component-bind']:''}, function (i) {
																	i['set-title-text'] = function (title) {
																		this.removeTextNode().insertTextNode(
																			title.replace(/[^a-zA-Z\d\s\.,\?"'\(\)&$#@!:]/g, '').replace(/_|:|\s\s+/g, ' '));
																	};
																});
														});
													});
												});
											});
										});
										d.insertNode('div', {class: 'flex-xs align-xs-center'}, function (d) {
											d.insertNode('figure', {}, function (f) {
												if (customElements.get('close-icon'))
													f.appendChild(document.createElement('close-icon').addComponentAppConstants({ 
															parentDeconstructor: self.deconstructor }));
											});
										});
									});
								})
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

customElements.define('copycat-meta', Meta);
