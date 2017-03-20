class CopyHeart extends CopyCatComponent {

	onConnect () {
		if (!this.componentAppStructured())
			this.deconstructor();

		this.componentAppAnchor.insertNode('div', {class:'tp-xs-4 bp-xs-4'}, function (d) {
			d.insertNode('div', {class:'lp-xs-4 rp-xs-4'}, function (d) {
				d.insertNode('div', {}, function (d) {
					d.insertNode('div', {class:'tp-xs-0 bp-xs-0'}, function (d) {
						d.insertNode('div', {class:'lp-xs-0 rp-xs-0'}, function (d) {
							d.insertNode('div', {}, function (d) {
								d.insertNode('div', {}, function (d) {
									d.insertNode('figure', {}, function (f) {
										f.insertNode('div', {class:'tp-xs-2 bp-xs-2'}, function (d) {
											d.insertNode('div', {class:'lp-xs-2 rp-xs-2'}, function (d) {
												d.insertSvgNode('svg', {x: 0, y: 0, width: 10, height: 10, viewBox: '672.4 250.6 10 10', style:'display:block;'}, function (s) {
													s.insertSvgNode('path', {d:'M681.5,252.1c-0.5-0.5-1.2-0.8-1.9-0.8c-0.7,0-1.4,0.3-1.9,0.8l-0.3,0.3l-0.3-0.3c-0.5-0.5-1.2-0.8-1.9-0.8 c-0.7,0-1.4,0.3-1.9,0.8c-0.5,0.5-0.8,1.2-0.8,1.9c0,0.7,0.3,1.4,0.8,1.9l3.9,3.9c0.1,0.1,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1l3.9-3.9 c0.5-0.5,0.8-1.2,0.8-1.9C682.2,253.3,682,252.7,681.5,252.1z M681.1,255.6l-3.7,3.7l-3.7-3.7c-0.4-0.4-0.6-0.9-0.6-1.5 c0-0.6,0.2-1.1,0.6-1.5c0.4-0.4,0.9-0.6,1.5-0.6c0.6,0,1.1,0.2,1.5,0.6l0.5,0.5c0.1,0.1,0.3,0.1,0.4,0l0.5-0.5 c0.4-0.4,0.9-0.6,1.5-0.6s1.1,0.2,1.5,0.6c0.4,0.4,0.6,0.9,0.6,1.5C681.7,254.6,681.5,255.2,681.1,255.6z'})
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
	}
	
	constructor () {
		super();
	}
}


customElements.define('copycat-heart', CopyHeart);