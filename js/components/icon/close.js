/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Icon extends HTMLComponent {

	onConnect (b) {
		console.log(this.componentAppConstants);
		let self = this;
		
		this.addEventListener('click', function () {
			self.componentAppConstants.parentDeconstructor(); 
		}, false);
		

		let e = document.createElement('div');
		e.appendChild(document.createTextNode('CLICK ME!'));
		
		b.appendChild(e)
	}
	
	constructor () {
		super();
	}
}

customElements.define('icon-component', Icon);
