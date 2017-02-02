Array.prototype.append = function () {
    // Iterate over items in sequence.
    for (let i in arguments) {
        // Append item at index to array.
        this.push(arguments[i])
    }
    // @return: @type: <array>
    return this;
};

Array.prototype.set = function () {
    // Set array to set and back to array.
    return Array.from(new Set(this));
};

Element.prototype.insertNode = function () {
    // Set argument sequence to array.
    let a = Array.prototype.slice.call(arguments);
    // Set first argument in sequence as new HTMLElement.
    let e = this.appendChild(document.createElement(a.shift()));
    // Iterate over items in sequence.
    for (let i in a) {
        // Test argument at index is an object.
        if (a[i] instanceof Object) {
            // Set attributes for HTMLElement.
            e.setAttributes(a[i]);
        }
        // Test argument at index is a string.
        else if (typeof a[i] === 'string') {
            // Insert text for HTMLElement.
            e.insertTextNode(a[i]);
        }
    }
    // Test argument index at end of argument sequence is function. Call function.
    if (a.slice(-1)[0] instanceof Function) a.slice(-1)[0](e, a);
    // @return: @type: <HTMLElementObject>
    return e;
};

Element.prototype.insertTextNode = function () {
    // Set argument sequence to array.
    let a = Array.prototype.slice.call(arguments);
    // Test argument index at zero is string. Shift item from list and set as HTMLTextNode.
    if (typeof a[0] === 'string') this.appendChild(document.createTextNode(a.shift()));
    // Test argument index at end of argument sequence is function. Call function.
    if (a.slice(-1)[0] instanceof Function) a.slice(-1)[0](this);
    // @return: @type: <HTMLElementObject>
    return this;
};

Element.prototype.setAttributes = function (attributes) {
    // Iterate over keys in object.
    for (let key in (attributes || {})) {
        // Set key attribute pair.
        this.setAttribute(key, attributes[key]);
    }
};

Element.prototype.remove = function (callback) {
    // Remove HTMLNode.
    this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    // Iterate over children in HTMLNode, HTMLCollection.
    for (let i in this.length) {
        // Remove HTMLNode.
        if (this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]);
    }
};