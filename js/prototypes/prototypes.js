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

