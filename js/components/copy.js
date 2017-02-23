class Copy extends HTMLElement {

	static get HTML () {
		
		let e = document.createElement('div');
		
		e.insertNode('div', {'data-grid-assign':'padding','class':'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div',  {'data-grid-assign':'padding','class':'lp-xs-10 rp-xs-10'}, function (d) {
				d.insertNode('div', {'data-component-structure':'content-frame'}, function (d) {
					d.insertNode('div', {'data-component-section':'main-content'}, function (d) {
						d.insertNode('div', {'data-component-structure':'content-frame'}, function (d) {
							d.insertNode('hgroup', {'data-component-section':'main-content-head'}, function (h) {
								h.insertNode('h3', {'data-component-section':'main-content-title'}, function (h) {
									h.insertNode('span', {'class':'font-xs-6 line-xs-9'}, function (s) {
										s.insertNode('span', {'data-title-string':''});
									});
								});
							});
							d.insertNode('p', {'data-component-section':'main-content-body'}, function (p) {
								p.insertNode('span', {'class':'font-xs-8 line-xs-14'}, function (s) {
									s.insertNode('span', {'data-text-string':''});
								});
							});
						});
						d.insertNode('div', {'data-component-structure':'content-frame'}, function (d) {
							d.insertNode('div', {'data-component-section':'main-content-meta'}, function (d) {});
						});
					});	
				});
			});
		});	

		return e;
	}
	
	set props (props) {
		for (let key in (props = props instanceof Object ? props : {}))
			if (props.hasOwnProperty(key))
				this[key] = props[key];
	}

	get text () {
		return this.shadowRoot.querySelector('[data-text-string');
	}

	set text (string) {
		this.text.insertTextNode(string);
	}
	
	get title () {
		return this.shadowRoot.querySelector('[data-title-string');
	}

	set title (string) {
		this.title.insertTextNode(string);
	}

	constructor () {
		super();

		this.attachShadow({mode:'open'});

		this.shadowRoot.appendChild(Copy.HTML);
	}
}
