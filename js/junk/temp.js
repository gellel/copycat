/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


Array.prototype.append = function () {
    for (let i = 0, l = arguments.length; i < l; i++) 
        this.push(arguments[i])

    // @return: @type: @array //
    return this;
};


Array.prototype.empty = function (filter) {
    filter && typeof filter === "function" ? 
        this.filter(function (i) { if (typeof i !== filter) return i; }) : this.length = 0;

    // @return: @type: @array //
    return this;
};


Array.prototype.not = function (filter) {

    // @return: @type: @array //
    return this.filter(function(i) { if (typeof i !== filter) return i; });
};


Array.prototype.set = function () {

    // @return: @type: @array //
    return Array.from(new Set(this));
};


Array.prototype.index = function (position) {  

    position = typeof position === 'number' ? parseInt(position) : 0;

    // @return: @type: @object //
    return this[position < this.length ? 0 : position > this.length ? this.length - 1 : position];
};


Element.prototype.insertNode = function () {

    arguments = Array.prototype.slice.call(arguments);

    let e = this.appendChild(document.createElement(arguments.shift().toString()))

    for (let i = 0, l = arguments.length; i < l; i++) 
        arguments[i] instanceof Object ? e.setAttributes(arguments[i]) : 
        typeof arguments[i] === 'string' && e.insertTextNode(arguments[i]);

    // @return: @type: @object //
    return arguments.slice(-1)[0] instanceof Function ? (arguments.slice(-1)[0](e, arguments) || e) : e;
};


Element.prototype.insertTextNode = function () {

    for (let i = 0, l = arguments.length; i < l; i++)
        this.appendChild(document.createTextNode(arguments[i].toString()));
   
    // @return: @type: @object //
    return this;
};


Element.prototype.insertSvgNode = function () {

    arguments = Array.prototype.slice.call(arguments);

    let e = this.appendChild(
        document.createElementNS('http://www.w3.org/2000/svg', arguments.shift().toString()));

    for (let i = 0, l = arguments.length; i < l; i++) 
        if (arguments[i] instanceof Object) 
            for (let key in arguments[i])
                key === 'xlink:href' ? 
                    e.setAttributeNS('http://www.w3.org/1999/xlink', 'href', arguments[i][key]):
                    e.setAttribute(key, arguments[i][key])

    // @return: @type: @object //
    return arguments.slice(-1)[0] instanceof Function ? (arguments.slice(-1)[0](e, arguments) || e) : e;
};


Element.prototype.setAttributes = function (attributes) {

    for (let key in (attributes = attributes instanceof Object ? attributes : {})) 
        this.setAttribute(key, attributes[key]);
   
    // @return: @type: @object //
    return this;
};


Element.prototype.remove = function (callback) {

    this.parentElement.removeChild(this);

    // @return: @type: @object //
    if (callback && typeof callback === "function") callback();
};


NodeList.prototype.remove = HTMLCollection.prototype.remove = function (callback) {

    for (let i = 0, l = this.length; i < l; i++) 
        if (this[i] && this[i].parentElement) 
            this[i].parentElement.removeChild(this[i]);

    // @return: @type: @object //
    if (callback && typeof callback === "function") callback();
};

String.prototype.toCapitalCase = function () {

    // @return: @type: @string //
    return this.charAt(0).toUpperCase() + this.slice(1);;
};




class Copy extends HTMLElement {

	static get HTML () {
		return document.createElement('div').insertNode('div', {'data-grid-assign':'padding','class':'tp-xs-6 bp-xs-6'}, function (d) {
			d.insertNode('div', {'data-grid-assign':'padding','class':'lp-xs-10 rp-xs-10'}, function (d) {
				d.insertNode('div', {'data-component-section':'', 'data-section-name':'text', 'data-component-function':'setText'})
			});
		});	
	}
	
	get sections () {
		for (let i = 0, e = this.shadowRoot.querySelectorAll('[data-component-section]'); i < e.length; i++) {
			if (e[i].hasAttribute('data-component-section')) {

				Object.assign(this.__sections__, {
					get [e[i].getAttribute('data-section-name')] () {
						return e[i];
					},
					set [e[i].getAttribute('data-section-name')] (str) {
						/** bound to object scope  - need to set to class parent **/
						this.setText(this[[e[i].getAttribute('data-section-name')]], str);
					}
				});
			}
		}

		return this.__sections__;
	}

	set properties (config) {
		for (let key in config)
			if (config.hasOwnProperty(key))
				Object.assign(this.__properties__, {key:config[key]});
	}

	setText (element, str) {
		element.innerHTML = str;
	}

	constructor () {
		super();

		this.__properties__ = {};
		this.__sections__ = {};

		this.attachShadow({mode: 'open'});

		this.shadowRoot.appendChild(Copy.HTML);
	}
}


customElements.define('copycat-copy', Copy)

var i = document.createElement('copycat-copy')