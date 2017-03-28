/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class HTMLPictoglpyh extends HTMLComponent {

	get componentAppBase () {
		let e = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		e.setAttribute('x', '0');
		e.setAttribute('y', '0');
		e.setAttribute('width', '10');
		e.setAttribute('height', '10');
		e.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
		e.setAttribute('xml:space', 'preserve');
		e.setAttribute('style', 'display: block;');

		return e;
	}

	get componentAppAnchor () {
		let e = this.shadowRoot.querySelector('svg');

		return e instanceof SVGSVGElement && this.shadowRoot.firstChild === e ? e : 
			this.shadowRoot.appendChild(this.componentAppBase);
	}

	constructor () {
		super();
	}
}
