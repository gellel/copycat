class CopyCatComponent extends HTMLComponent {

	componentAppStructured () {
		return (Object.keys(this.componentAppProperties).length && 
			this.componentAppAnchor.insertNode instanceof Function);
	}
	
	constructor () {
		super();
	}
}

customElements.define('copycat-component', CopyCatComponent);