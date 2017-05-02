/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/



class CopyTitle extends HTMLComponent {

	/* inherits from HTMLComponent class.
	 * manages the title pushed through from copycat element.
	 * requires properties assignment before inserted into document object module.
	 * upon page insertion property values are applied to mapped sections. */

	['format-property-title'] (title, property, element) {
		/* format string. */
		title.replace(/_/g, ' ').replace(/[^a-zA-Z\d\s\.,\?"'\(\)&$#@!]/g, '').replace(/\s\s+/g, ' ');
		/* strip and insert string. */
		element.removeTextNode().insertTextNode(title);
	}

	connectedCallback () {
		let self = this;
		this.component.anchor.insertNode('div', {class:'tp-xs-4 bp-xs-4'}, function (d) {
			d.insertNode('div', {class:'lp-xs-4 rp-xs-4'}, function (d) {
				d.insertNode('h3', {class:'font-xs-6'}, function (p) {
					p.insertNode('span', {class:'font-weight-300'}, function (s) {
						s.insertNode('span', {class:'line-xs-10'}, function (s) {
							s.insertNode('i', {[self.component.sectionReference]:'title', 
								[self.component.methodReference]:'format-property-title'});
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

/* register element. */
customElements.define(
	'copycat-title', CopyTitle);



class CopySource extends HTMLComponent {

	/* inherits from HTMLComponent class.
	 * manages the source pushed through from copycat element.
	 * requires properties assignment before inserted into document object module.
	 * upon page insertion property values are applied to mapped sections. */

	['format-property-source'] (source, property, element) {
		/* format string. */
		source = source.replace(/http:\/\/|https:\/\/|w{3}\.{1}/g, '');
		/* strip and insert string. */
		element.removeTextNode().insertTextNode(source);
	}

	connectedCallback () {
		let self = this;
		this.component.anchor.insertNode('div', {class:'tp-xs-4 bp-xs-4'}, function (d) {
			d.insertNode('div', {class:'lp-xs-4 rp-xs-4'}, function (d) {
				d.insertNode('h4', {class:'font-xs-6'}, function (p) {
					p.insertNode('span', {class:'font-weight-400'}, function (s) {
						s.insertNode('span', {class:'line-xs-10'}, function (s) {
							s.insertNode('i', {[self.component.sectionReference]:'source', 
								[self.component.methodReference]:'format-property-source'});
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

/* register element. */
customElements.define(
	'copycat-source', CopySource);



class CopyText extends HTMLComponent {

	/* inherits from HTMLComponent class.
	 * manages the text pushed through from copycat element.
	 * requires properties assignment before inserted into document object module.
	 * upon page insertion property values are applied to mapped sections. */

	['format-property-text'] (text, property, element) {
		/* strip and insert string. */
		element.removeTextNode().insertTextNode(text);
	}

	connectedCallback () {
		let self = this;
		this.component.anchor.insertNode('div', {class:'tp-xs-4 bp-xs-4'}, function (d) {
			d.insertNode('div', {class:'lp-xs-4 rp-xs-4'}, function (d) {
				d.insertNode('p', {class:'font-xs-6'}, function (p) {
					p.insertNode('span', {class:'font-weight-400'}, function (s) {
						s.insertNode('span', {class:'line-xs-10'}, function (s) {
							s.insertNode('i', {[self.component.sectionReference]:'text',
								[self.component.methodReference]:'format-property-text'});
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

/* register element. */
customElements.define(
	'copycat-text', CopyText);



class CopyCat extends HTMLComponent {

	/* inherits from HTMLComponent class.
	 * manages the content pushed through from content pages.
	 * accepts content propagation before inserted into document object module.
	 * upon page insertion property values are applied to mapped sections. */

	connectedCallback () {
		let self = this;
		this.component.anchor.insertNode('div', {class:'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div', {class:'lp-xs-8 rp-xs-8'}, function (d) {
				d.insertNode('div', function (d) {
					d.insertNode('copycat-title', function (c) {
						c.appendProperty(
							'title', self.component.properties.title).propagateProperty('title');
					});
				});
				d.insertNode('div', function (d) {
					d.insertNode('copycat-source', function (c) {
						c.appendProperty(
							'source', self.component.properties.source).propagateProperty('source');
					});
				});
				d.insertNode('div', function (d) {
					d.insertNode('copycat-text', function (c) {
						c.appendProperty(
							'text', self.component.properties.text).propagateProperty('text');
					});
				});
			});
		});
	}

	constructor () {
		super().appendStates({ edit: false });
	}
}

/* register element. */
customElements.define(
	'copycat-element', CopyCat);
