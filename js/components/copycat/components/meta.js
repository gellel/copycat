/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Meta extends CopyCat {

	onConnect (b) {
		b.insertNode('div', {class:'tp-xs-4 bp-xs-4'}, function (d) {
			d.insertNode('div', {class:'lp-xs-4 rp-xs-4'}, function (d) {
				d.insertNode('div', {}, function (d) {
					d.insertNode('div', {class:'tp-xs-0 bp-xs-0'}, function (d) {
						d.insertNode('div', {class:'lp-xs-0 rp-xs-0'}, function (d) {
							d.insertNode('div', {}, function (d) {
								d.insertNode('div', {class:'flex-xs dir-xs-row align-xs-stretch'}, function (d) {
									d.insertNode('div', {});
									d.insertNode('div', {});
								});
							})
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

customElements.define('copycat-meta', Meta);
