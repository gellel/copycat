

Array.prototype.append = function () {
    /*
     * Extension method for Array Object. 
     * Pushes arguments sequence to Array instance.. 
     * Returns Array.
    */
    for (let i = 0; i < arguments.length; i++) this.push(arguments[i]);

    return this;
};


Array.prototype.empty = function () {
    /*
     * Extension method for Array Object.
     * Empties contents from Array instance.
     * Returns Array.
    */
    return [];
};


Array.prototype.set = function () {
    /*
     * Extension method for Array Object.
     * Sets Array instance to contain unique values.
     * Returns Array.
    */
    return Array.from(new Set(this));
};


Element.prototype.insertNode = function () {
    /*
     * Extension method for HTMLElement Object.
     * Constructs HTMLElement childNode for parent HTMLElement.
     * Returns HTMLElement childNode or callback argument.
    */
    let a = Array.prototype.slice.call(arguments);

    let e = this.appendChild(document.createElement(a.shift()));

    for (let i = 0; i < a.length; i++) a[i] instanceof Object ? e.setAttributes(a[i]) : typeof a[i] === "string" && e.insertTextNode(a[i]);

    return a.slice(-1)[0] instanceof Function ? a.slice(-1)[0](e, a) : e;
};

Element.prototype.insertTextNode = function () {
    /*
     * Extension method for HTMLElement Object.
     * Constructs textNode for HTMLElement.
     * Returns HTMLElement.
    */
    for (let i = 0; i < arguments.length; i++) this.appendChild(document.createTextNode(arguments[i].toString()));

    return this;
};


Element.prototype.setAttributes = function (attributes) {
    /*
     * Extension method for HTMLElement Object.
     * Assigns multiple attributes for HTMLElement.
     * Returns HTMLElement.
    */
    for (let key in (attributes = attributes instanceof Object ? attributes : {})) this.setAttribute(key, attributes[key]);

    return this;
};


Element.prototype.remove = function () {
    /*
     * Extension method for HTMLElement Object.
     * Removes HTMLElement from Document Object Module.
    */
    this.parentElement.removeChild(this);
};


NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    /*
     * Extension method for HTMLElement Object.
     * Removes HTMLElement from Document Object Module.
    */
    for (let i = 0; i < this.length; i++) if (this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]);
};


Object.prototype.stringify = function () {
    /*
     * Extension method for Object primative. 
     * Sets contents to JSON string. 
     * Returns stringified Object instance.
    */
    return JSON.stringify(this);
};


String.prototype.objectify = function () {
    /*
     * Extension method for String Object. 
     * Sets string contents to Object. 
     * Returns Object.
    */
    try {
        return JSON.parse(this);
    } catch (e) {
        return {};
    }
};