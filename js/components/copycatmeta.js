class CopyMeta extends HTMLComponent {

	onConnect () {
		if (!(Object.keys(this.componentAppProperties).length && this.componentAppAnchor.insertNode instanceof Function))
			this.deconstructor();

		this.componentAppAnchor.insertNode('div', {}, function (d) {
			
		});
	}

	constructor () {
		super();
	}
}

customElements.define('copycat-meta', CopyMeta);