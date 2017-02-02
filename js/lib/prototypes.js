Array.prototype.append = function () {
    // Iterate over items in sequence. Append item at index to array.
    for (let i in arguments) this.push(arguments[i]);
    // @return: @type: <array>
    return this;
};

Array.prototype.set = function () {
    // @return: @type: <array>
    return Array.from(new Set(this));
};

Element.prototype.insertNode = function () {
    // Set argument sequence to array.
    let a = Array.prototype.slice.call(arguments);
    // Set first argument in sequence as new HTMLElement.
    let e = this.appendChild(document.createElement(a.shift()));
    // Iterate over items in sequence.
    for (var i in a) a[i] instanceof Object ? e.setAttributes(a[i]) : typeof a[i] === "string" && e.insertTextNode(a[i]);
    // @return: @type: <*/HTMLElementObject>
    return a.slice(-1)[0] instanceof Function ? a.slice(-1)[0](e, a) : e;
};

Element.prototype.insertTextNode = function () {
    // Set argument sequence to array.
    let a = Array.prototype.slice.call(arguments);
    // Test argument index at zero is string. Shift item from list and set as HTMLTextNode.
    if (typeof a[0] === 'string') this.appendChild(document.createTextNode(a.shift()));    
    // @return: @type: <*/HTMLElementObject>
    return a.slice(-1)[0] instanceof Function ? a.slice(-1)[0](this) : this;
};

Element.prototype.setAttributes = function (attributes) {
    // Iterate over keys in object. Set key attribute pair.
    for (let key in (attributes = attributes instanceof Object ? attributes : {})) this.setAttribute(key, attributes[key]);
};

Element.prototype.remove = function () {
    // Remove HTML Element from document object module.
    this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    // Iterate child nodes seqeuence. Remove HTML from document object module at index.
    for (let i in this.length) if (this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]);
};