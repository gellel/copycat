class Copy extends HTMLElement {

    ['set-text-nodes'] () {
        let a = Array.prototype.slice.call(arguments);

        let e = a.shift();

        if (e instanceof Element) {

            let c = e.firstChild;
            let n;

            while (c) {
                n = c.nextSibling;
                if (c.nodeType === 3) 
                    e.removeChild(c);
                c = n;
            }

            a = a.filter(function (i) { if (typeof i === 'string') return i });

            for (let i = 0, l = a.length; i < l; i++)
                e.appendChild(document.createTextNode(a[i]))
        }

        return this;
    }

    ['set-component-arguments'] (element, parameters) {
        if (element.__proto__ && element.__proto__ instanceof Element && this.contains(element))
            if (element.hasAttribute('data-component') && parameters instanceof Object)
                element.setAttribute('data-component-arguments', JSON.stringify(parameters))

        return this;
    }

    ['set-component-method'] (element, method) {
        if (element.__proto__ && element.__proto__ instanceof Element && this.contains(element)) 
            if (element.hasAttribute('data-component') && typeof method === 'string')
                if (this[method] && this[method] instanceof Function)
                    element.setAttribute('data-component-method', method)

        return this;
    }

    ['set-component-id'] (element, id) {
        if (element.__proto__ && element.__proto__ instanceof Element && this.contains(element)) 
            if (element.hasAttribute('data-component') && typeof id === 'string')
                element.setAttribute('data-component-id', id)

        return this;
    }

    get ['get-component-structure'] () {
        let e = document.createElement('div');

        e.setAttribute('data-component', '');
        e.setAttribute('data-component-id', 'title');
        e.setAttribute('data-component-method','set-text-nodes');
        e.setAttribute('data-component-arguments','hello world');

        return e;
    }

    get ['get-component-sections'] () {
        let s = this.querySelectorAll('[data-component]');

        for (var i = 0, o = {}, l = s.length; i < l; i++)
            if (s[i].hasAttribute('data-component-id'))
                Object.assign(o, {[s[i].getAttribute('data-component-id')]:s[i]})

        return o;
    }

    ['propegate-properties'] (properties) {

        /* assert dynamic */
        console.log('%csections', 'color:red;', this['get-component-sections']);
    }

    set assertProperties (properties) {
        if (properties instanceof Object && Object.keys(properties).length)
            for (let key in properties)
                if (properties.hasOwnProperty(key))
                    this.properties[key] = properties[key];

        return this.properties;
    }

    propegateProperties (properties) {
        if (properties instanceof Object && Object.keys(properties).length)
            for (let key in properties)
                if (properties.hasOwnProperty(key))
                    this.properties[key] = properties[key];
        

        this['propegate-properties'](this.properties);

        return this;
    }


    disconnectedCallback () {
        console.log('%cCopyCat %cflees!', 'color:#bbcccb;font-style:italic;', 'color:#bbcccb;font-weight:bold;');
    }

    connectedCallback () {
        /* set inner */
        this.appendChild(this['get-component-structure']);
        /* set properties for sections */
        this['propegate-properties'](this.properties);

        console.log('%cA new CopyCat %cpounces %conto the page!', 'color:#bbcccb;font-style:italic;', 'color:#bbcccb;font-weight:bold;', 'color:#bbcccb;font-style:italic;');
    }

    constructor () {
        super(arguments);

        Object.assign(this, {properties: new Object()});
    }
}

customElements.define('copycat-copy', Copy);

var i = document.createElement('copycat-copy');

if(window.clear) clear();

document.body.appendChild(i);

