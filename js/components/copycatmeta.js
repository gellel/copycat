class CopyMeta extends HTMLComponent {

	onConnect () {
		if (!(Object.keys(this.componentAppProperties).length && this.componentAppAnchor.insertNode instanceof Function))
			this.deconstructor();

		this.componentAppAnchor.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div', {class:'lp-xs-6 rp-xs-6'}, function (d) {
				d.insertNode('div', {}, function (d) {
					d.insertNode('div', {class:'tp-xs-0 bp-xs-0'}, function (d) {
						d.insertNode('div', {class:'lp-xs-0 rp-xs-0'}, function (d) {
							d.insertNode('div', {class:'bm-xs-0'}, function (d) {
								d.insertNode('hgroup', {}, function (g) {
									g.insertNode('h6', {class:'bm-xs-0'}, function (h) {
										h.insertNode('span', {class:'font-xs-6'}, function (s) {
											s.insertNode('span', {class:'line-xs-10'}, function (s) {
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

customElements.define('copycat-meta', CopyMeta);