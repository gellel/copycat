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
    /**
    *** @param: arguments, @type: sequence.
    *
    *** @return: @type: array.
    */

    for (let i = 0, l = arguments.length; i < l; i++) 
        this.push(arguments[i])

    return this;
};


Array.prototype.empty = function () {
    /**
    *** @param: arguments, @type: undefined.
    *
    *** @return: @type: array.
    */

    this.length = 0;

    return this;
};


Array.prototype.not = function (filter) {
    /**
    *** @param: filter, @type: string.
    *
    *** @return: @type: array.
    */

    return this.filter(function(i) { return typeof i !== filter ? i : !1; });
};


Array.prototype.set = function () {
    /**
    *** @param: arguments, @type: undefined.
    *
    *** @return: @type: array.
    */

    return Array.from(new Set(this));
};


Array.prototype.index = function (position) {
    /**
    *** @param: position, @type: integer.
    *
    *** @return: @type: *.
    */

    position = typeof position === 'number' ? parseInt(position) : 0;

    return this[ position < this.length ? 0 : position > this.length ? this.length - 1 : position ];
};


Element.prototype.insertNode = function () {
    /**
    *** @param: arguments, @type: sequence.
    *
    *** @return: @type: element.
    */

    arguments = Array.prototype.slice.call(arguments);

    let e = this.appendChild(document.createElement(arguments.shift().toString()))

    for (let i = 0, l = arguments.length; i < l; i++) 
        arguments[i] instanceof Object ? e.setAttributes(arguments[i]) : 
        typeof arguments[i] === 'string' && e.insertTextNode(arguments[i]);

    return arguments.slice(-1)[0] instanceof Function ? (arguments.slice(-1)[0](e, arguments) || e) : e;
};


Element.prototype.insertTextNode = function () {
    /**
    *** @param: arguments, @type: sequence.
    *
    *** @return: @type: element.
    */

    for (let i = 0, l = arguments.length; i < l; i++)
        this.appendChild(document.createTextNode(arguments[i].toString()));

    return this;
};


Element.prototype.insertSvgNode = function () {
    /**
    *** @param: arguments, @type: sequence.
    *
    *** @return: @type: element.
    */
    
    arguments = Array.prototype.slice.call(arguments);

    let e = this.appendChild(document.createElementNS('http://www.w3.org/2000/svg', arguments.shift().toString()));

    for (let i = 0, l = arguments.length; i < l; i++) 

        if (arguments[i] instanceof Object) 

            for (let key in arguments[i])

                key === 'xlink:href' ? 
                    e.setAttributeNS('http://www.w3.org/1999/xlink', 'href', arguments[i][key]):
                    e.setAttribute(key, arguments[i][key])

    return arguments.slice(-1)[0] instanceof Function ? (arguments.slice(-1)[0](e, arguments) || e) : e;
};


Element.prototype.setAttributes = function (attributes) {
    /**
    *** @param: attributes, @type: object.
    *
    *** @return: @type: element.
    */

    for (let key in (attributes = attributes instanceof Object ? attributes : {})) 
        this.setAttribute(key, attributes[key]);

    return this;
};


Element.prototype.remove = function () {
    /**
    *** @return: @type: undefined.
    */

    this.parentElement.removeChild(this);
};


NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    /**
    *** @return: @type: undefined.
    */

    for (let i = 0, l = this.length; i < l; i++) 
        if (this[i] && this[i].parentElement) 
            this[i].parentElement.removeChild(this[i]);
};

