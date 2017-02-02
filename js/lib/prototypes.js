/**
 * Extension methods for Copycat Chrome extension.
 * Modifies JavaScript Array, Element, NodeList, HTMLCollection.
 * Scoped to Copycat popup.html window.
**/

Array.prototype.append = function () {
    /** 
     * Array extension. Updates array instance and returns same instance.
     * Intended to be used for array event chaining.
    **/
    /**
     * @parameters: <arguments>, @type: <sequence>, @required: <false>
     * @description: Arguments to be pushed to array.
    **/
    // Iterate over items in sequence. Append item at index to array.
    for (let i in arguments) this.push(arguments[i]);
    // @return: @type: <array>
    return this;
};

Array.prototype.set = function () {
    /** 
     * Array extension. Updates array instance to contain unique values.
     * Intended to be used for array event chaining.
    **/
    /**
     * @parameters: <undefined>, @type: <undefined>, @required: <false>
     * @description: Method does not handle supplied arguments.
    **/
    // @return: @type: <array>
    return Array.from(new Set(this));
};

Element.prototype.insertNode = function () {
    /** 
     * Element extension. Inserts HTML into Element.
     * Intended for dynamic HTML structure creation.
     * Supports chaining.
    **/
    /**
     * @parameters: <arguments>, @type: <sequence>, @required: <false>
     * @description: Arguments used to defined constructed HTML.
    **/
    // Set argument sequence to array.
    let a = Array.prototype.slice.call(arguments);
    // Set first argument in sequence as new HTMLElement.
    let e = this.appendChild(document.createElement(a.shift()));
    // Iterate over items in sequence.
    for (var i in a) a[i] instanceof Object ? e.setAttributes(a[i]) : typeof a[i] === "string" && e.insertTextNode(a[i]);
    // @return: @type: <**/HTMLElementObject>
    return a.slice(-1)[0] instanceof Function ? a.slice(-1)[0](e, a) : e;
};

Element.prototype.insertTextNode = function () {
    /** 
     * Element extension. Inserts text into Element.
     * Supports chaining.
    **/
    /**
     * @parameters: <arguments>, @type: <sequence>, @required: <false>
     * @description: Arguments used to updated target HTML.
    **/
    // Set argument sequence to array.
    let a = Array.prototype.slice.call(arguments);
    // Test argument index at zero is string. Shift item from list and set as HTMLTextNode.
    if (typeof a[0] === 'string') this.appendChild(document.createTextNode(a.shift()));    
    // @return: @type: <**/HTMLElementObject>
    return a.slice(-1)[0] instanceof Function ? a.slice(-1)[0](this) : this;
};

Element.prototype.setAttributes = function (attributes) {
    /** 
     * Element extension. Sets multiple attributes for Element.
     * Supports chaining.
    **/
    /**
     * @parameters: <attributes>, @type: <object>, @required: <false>
     * @description: Object key value pairs for attribute mapping.
    **/
    // Iterate over keys in object. Set key attribute pair.
    for (let key in (attributes = attributes instanceof Object ? attributes : {})) this.setAttribute(key, attributes[key]);
    // @return: @type: <HTMLElementObject>
    return this;
};

Element.prototype.remove = function () {
    /** 
     * Element extension. Removes Element from document object module.
    **/
    /**
     * @parameters: <undefined>, @type: <undefined>, @required: <false>
     * @description: Method does not handle supplied arguments.
    **/
    // Remove HTML Element from document object module.
    this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    /** 
     * NodeList and HTMLCollection extension. Remove childNodes from HTMLElement.
    **/
    /**
     * @parameters: <undefined>, @type: <undefined>, @required: <false>
     * @description: Method does not handle supplied arguments.
    **/
    // Iterate child nodes seqeuence. Remove HTML from document object module at index.
    for (let i in this.length) if (this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]);
};