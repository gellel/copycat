/**
*
* @file: CopyCat methods extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

Array.prototype.append = function () {
    /**
    *** Array.append(@args);
    *
    * Modifies array instance. 
    * Pushes arguments to array.
    * Accepts argument sequence.
    * Returns @array.
    *
    **/

    // Process arguments sequence. Append contents to array.
    for (let i = 0; i < arguments.length; i++) this.push(arguments[i])
    
    return this;
};


Array.prototype.empty = function () {
    /**
    *** Array.append(@void);
    *
    * Modifies instance. 
    * Empties array contents.
    * Accepts void.
    * Returns @array.
    *
    **/

    // Subset array instance.
    this.slice(0, this.length);
    
    return this;
};


Array.prototype.set = function () {
    /**
    *** Array.set(@void);
    *
    * Modifies instance. 
    * Empties duplicate properties.
    * Accepts void.
    * Returns @array.
    *
    **/
    
    return Array.from(new Set(this));
};


Object.prototype.stringify = function () {
    /**
    *** Object.stringify(@void)
    *
    * Modifies instance.
    * Updates object to string type.
    * Accepts void.
    * Returns @string.
    *
    **/

    return JSON.stringify(this);
};


Object.prototype.addKey = function () {
    /**
    *** Object.addKey(@args)
    *
    * Modifies instance.
    * Add keys for object.
    * Accepts argument sequence.
    * Returns @object.
    *
    **/

    // Process arguments sequence. 
    // Process keys for argument at index. 
    // Add property for key.
    for (let i = 0, a = Array.prototype.slice.call(arguments).filter(function (i) { return i instanceof Object ? i : !1; }); i < a.length; i++) 
        for (key in a[i]) if (this.hasOwnProperty(key)) this[key] = a[i][key]; 

    return this;
};


Object.prototype.editKey = function () {
    /**
    *** Object.editKey(@args)
    *
    * Modifies instance.
    * Edits keys for object.
    * Accepts argument sequence.
    * Returns @object.
    *
    **/

    // Process arguments sequence. 
    // Process keys for argument at index. 
    // Edit property for defined and unique key.
    for (let i = 0, a = Array.prototype.slice.call(arguments).filter(function (i) { return i instanceof Object ? i : !1; }); i < a.length; i++) 
        for (key in a[i]) if (key in this && this.hasOwnProperty(key)) this[key] = a[i][key]; 

    return this;
};


Object.prototype.deleteKey = function() {
    /**
    *** Object.deleteKey(@args)
    *
    * Modifies instance.
    * Deletes keys for object.
    * Accepts argument sequence.
    * Returns @object.
    *
    **/

    // Process arguments sequence. 
    // Process keys for argument at index. 
    // Delete defined and unique key.
    for (let i = 0, a = Array.prototype.slice.call(arguments).filter(function (i) { return typeof i === 'string' ? i : !1; }); i < a.length; i++) 
        if (a[i] in this && this.hasOwnProperty(a[i])) delete this[a[i]]; 

    return this;
};


String.prototype.object = function () {
    /**
    *** String.object(@void)
    *
    * Modifies instance.
    * Updates string to object type.
    * Accepts void.
    * Returns @object.
    *
    **/

    // Set regular expression pattern. 
    // Matches simple object structures.
    let regexp = /^\{((\s?)*(\"[^"]+\"(\s?)*:(\s?)*(\d|\"[^"]*\"|\{.*\}|\[.*\])+,?)+(\s?))*\}$/gi;

    return regexp.test(this) ? JSON.parse(this) : {};
};


Element.prototype.insertNode = function () {
    /**
    *** Element.insertNode(@args)
    *
    * Creates the HTML element specified by tagName.
    * Accepts argument sequence.
    * Returns @element.
    * 
    **/

    let a = Array.prototype.slice.call(arguments);

    // Create and append HTML element. Use first argument as element type.
    let e = this.appendChild(document.createElement(a.shift().toString()));
    
    // Process arguments sequence. 
    // Set strings to textNodes. Set objects to HTML attributes.
    for (let i = 0; i < a.length; i++) 
        a[i] instanceof Object ? 
            e.setAttributes(a[i]) : typeof a[i] === "string" && e.insertTextNode(a[i]);
    
    return a.slice(-1)[0] instanceof Function ? a.slice(-1)[0](e, a) : e;
};


Element.prototype.insertTextNode = function () {
    /**
    *** Element.insertTextNode(@args)
    *
    * Creates the HTML text nodes for element.
    * Accepts argument sequence.
    * Returns @element.
    * 
    **/

    // Process arguments sequence. 
    // Filter array to contain strings or numbers. Set text node from argument at index.
    for (let i = 0, a = Array.prototype.slice.call(arguments).filter(function (i) { return typeof i === "string" || typeof i === "number" ? i : !1; }); i < a.length; i++) 
        this.appendChild(document.createTextNode(a[i]));
    
    return this;
};


Element.prototype.setAttributes = function (attributes) {
    /**
    *** Element.setAttributes(@object)
    *
    * Sets attributes for element.
    * Accepts object type.
    * Returns @element.
    * 
    **/

    // Process keys in object argument.
    // Set HTML attribute for current key at index.
    for (let key in (attributes = attributes instanceof Object ? attributes : {})) 
        this.setAttribute(key, attributes[key]);
    
    return this;
};


Element.prototype.remove = function () {
    /**
    *** Element.remove(@void)
    *
    * Removes element from document tree.
    * Accepts void.
    * Returns: @void.
    *
    **/

    this.parentElement.removeChild(this);
};


NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    /**
    *** Element.remove(@void)
    *
    * Removes childNodes from document tree.
    * Accepts void.
    * Returns: @void.
    *
    **/

    // Process child nodes for element.
    // Remove element from document tree.
    for (let i = 0, len = this.length; i < len; i++) 
        if (this[i] && this[i].parentElement) 
            this[i].parentElement.removeChild(this[i]);
};


