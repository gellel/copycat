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
		console.log(b);
		b.appendChild(document.createElement('div'))
	}
	
	constructor () {
		super();
	}
}

customElements.define('icon-component', Icon);
