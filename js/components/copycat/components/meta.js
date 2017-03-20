class CopyMeta extends CopyCatComponent {

	onConnect () {
		if (!this.componentAppStructured())
			this.deconstructor();

		let self = this;

		this.componentAppAnchor.insertNode('div', {class:'tp-xs-4 bp-xs-4'}, function (d) {
			d.insertNode('div', {class:'lp-xs-4 rp-xs-4'}, function (d) {
				d.insertNode('div', {}, function (d) {
					d.insertNode('div', {class:'tp-xs-0 bp-xs-0'}, function (d) {
						d.insertNode('div', {class:'lp-xs-0 rp-xs-0'}, function (d) {
							d.insertNode('div', {}, function (d) {
								d.insertNode('div', {class:'flex-xs dir-xs-row align-xs-center'}, function (d) {
									d.insertNode('div', {class:'rm-xs-3'}, function (d) {
										d.insertNode('hgroup', {}, function (g) {
											g.insertNode('h6', {}, function (h) {
												h.insertNode('span', {class:'font-xs-6'}, function (s) {
													s.insertNode('span', {class:'line-xs-10'}, function (s) {
														s.insertNode('d', {'data-component-section':'','data-component-bind':'',
															'data-component-id':'text','data-component-method':'format-key-title'}, function (d) {
																d['format-key-title'] = function (title) {
																	this.removeTextNode().insertTextNode(title);
																};
															});
													});
												});
											});
										});
									});
									d.insertNode('div', {class:'lm-xs-3'}, function (d) {
										d.insertNode('figure', {}, function (f) {
											f.insertNode('div', {class:'tp-xs-2 bp-xs-2'}, function (d) {
												d.insertNode('div', {class:'lp-xs-2 rp-xs-2'}, function (d) {
													d.insertSvgNode('svg', {x: 0, y: 0, width: 10, height: 10, viewBox: '182.5 19.5 10 10', style:'display:block;'}, function (s) {
														s.insertSvgNode('path', {d:'M188.6,24.5l3.2-3.2c0.3-0.3,0.3-0.8,0-1.1c-0.3-0.3-0.8-0.3-1.1,0l-3.2,3.2l-3.2-3.2c-0.3-0.3-0.8-0.3-1.1,0 c-0.3,0.3-0.3,0.8,0,1.1l3.2,3.2l-3.2,3.2c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l3.2-3.2l3.2,3.2c0.3,0.3,0.8,0.3,1.1,0 c0.3-0.3,0.3-0.8,0-1.1L188.6,24.5z'})
													});
													d.addEventListener('click', function () {
														self.deconstructor();
													}, false);
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