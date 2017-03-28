/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Close extends HTMLPictoglpyh {

	get componentAppSvgPath () {
		let e = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		e.setAttributeNS(null, 'd', this.D);

		return e;
	}

	propagateStructure () {

		let b = this.componentAppAnchor;
		
		b.appendChild(this.componentAppSvgPath);

		b.setAttributeNS(null, 'viewBox', this.VIEWBOX);
	}

	constructor () {
		super();

		this.addComponentAppConstants({
			d: 'M188.6, 24.5l3.2-3.2c0.3-0.3, 0.3-0.8,0-1.1c-0.3-0.3-0.8-0.3-1.1, 0l-3.2,3.2l-3.2-3.2c-0.3-0.3-0.8-0.3-1.1, 0 c-0.3, 0.3-0.3, 0.8, 0, 1.1l3.2, 3.2l-3.2, 3.2c-0.3,0.3-0.3,0.8, 0, 1.1c0.3, 0.3, 0.8, 0.3, 1.1, 0l3.2-3.2l3.2, 3.2c0.3, 0.3, 0.8, 0.3, 1.1, 0 c0.3-0.3, 0.3-0.8, 0-1.1L188.6, 24.5z',
			viewBox: '182.5 19.5 10 10'
		});
	}
}

customElements.define('close-icon', Close);
