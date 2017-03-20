class CopyHeart extends CopyCatComponent {

	onConnect () {
		if (!this.componentAppStructured())
			this.deconstructor();
	}
	
	constructor () {
		super();
	}
}


customElements.define('copycat-heart', CopyHeart);