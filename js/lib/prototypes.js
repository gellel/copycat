/*
 *  Extension script for browser extension.
 *  Manages required shorthand built-in functions.
 *  File appended to event page, popup page.
*/


Array.prototype.append = function () {
    // Iterate arguments sequence.
    // Push argument at index to instance.
    for (let i = 0; i < arguments.length; i++) this.push(arguments[i]);

    // @return: @type: <array>
    return this;
};


Array.prototype.empty = function () {
    // Subset arguments from instance.
    // Sets instance to empty.
    this.splice(0, this.length);
    
    // @return: @type: <array>
    return this;
};


Array.prototype.set = function () {
    // @return: @type: <array>
    return Array.from(new Set(this));
};


Element.prototype.insertNode = function () {
    // Set arguments to array.
    let a = Array.prototype.slice.call(arguments);

    // Shift first item from arguments.
    // Set argument to string. 
    // Construct HTMLNode from string.
    let e = this.appendChild(document.createElement(a.shift().toString()));

    // Iterate over arguments sequence. 
    // Set strings to TextNodes.
    // Set objects to attributes.
    for (let i = 0; i < a.length; i++) a[i] instanceof Object ? e.setAttributes(a[i]) : typeof a[i] === "string" && e.insertTextNode(a[i]);
    
    // @return: @type: <HTMLNode>
    return a.slice(-1)[0] instanceof Function ? a.slice(-1)[0](e, a) : e;
};

Element.prototype.insertTextNode = function () {
    // Set arguments to array.
    let a = Array.prototype.slice.call(arguments);

    // Iterate over arguments sequence.
    // Set argument to string.
    // Construct TextNode from strings.
    for (let i = 0; i < arguments.length; i++) this.appendChild(document.createTextNode(arguments[i].toString()));
    
    // @return: @type: <HTMLNode>
    return this;
};


Element.prototype.setAttributes = function (attributes) {
    // Set argument to object structure.
    // Iterate over keys in object.
    // Set attribute from key. 
    // Use value from object key pair.
    for (let key in (attributes = attributes instanceof Object ? attributes : {})) this.setAttribute(key, attributes[key]);
    
    // @return: @type: @HTMLNode
    return this;
};


Element.prototype.remove = function () {
    // Navigate to parentElement for HTMLNode.
    // Remove reference HTMLNode from Document Object Module.
    this.parentElement.removeChild(this);
};


NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    // Iterate over childNodes for HTMLNode.
    // Test childNode at index and parentNode are defined.
    // Remove reference HTMLNode from Document Object Module.
    for (let i = 0, len = this.length; i < len; i++) if (this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]);
};


Object.prototype.stringify = function () {
    // @return: @type: <string>
    return JSON.stringify(this);
};


String.prototype.objectify = function () {
    // Attempt to format string as object.
    { try { this = JSON.parse(this) } catch (e) { this = {} }

    // @return: @type: <object>
    return this;
};