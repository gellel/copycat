class Copy extends HTMLElement {

    ['assign-text-nodes'] () {
        /* element, [strings,..], new String() */
        let a = Array.prototype.slice.call(arguments);

        let e = a.shift();

        let j = a.slice(-1)[0] instanceof String ? a.slice(-1)[0].valueOf() : false;

        if (e instanceof Element) {

            let c = e.firstChild;
            let n;

            while (c) {
                n = c.nextSibling;
                if (c.nodeType === 3) {
                   e.removeChild(c);
                } 
                c = n;
            }

            a = a.filter(function (i) { 
                if (typeof i === 'string') return i });

            for (let i = 0, l = a.length; i < l; i++) {
                
                e.appendChild(document.createTextNode(a[i]))

                if (j) e.appendChild(document.createTextNode(j))
            }
        }

        return this;
    }

    ['assign-component-arguments'] (e, parameters) {
        if (this['has-decendant'](e))
            if (e.hasAttribute('data-component') && parameters instanceof Object)
                e.setAttribute('data-component-arguments', JSON.stringify(parameters))

        return this;
    }

    ['assign-component-method'] (e, method) {
        if (this['has-decendant'](e)) 
            if (e.hasAttribute('data-component') && typeof method === 'string')
                if (this[method] && this[method] instanceof Function)
                    e.setAttribute('data-component-method', method)

        return this;
    }

    ['assign-component-id'] (e, id) {
        if (this['has-decendant'](e)) 
            if (e.hasAttribute('data-component') && typeof id === 'string')
                e.setAttribute('data-component-id', id)

        return this;
    }

    ['has-decendant'] (e) {
        return e.__proto__ instanceof Element && this.contains(e) ? true : false;
    }

    ['has-assertion'] (e) {
       return (this['is-component'](e) && e.hasAttribute('data-component-method') ? true : false;
    }
    
    ['is-component'] (e) {
        return (this['has-decendant'](e) && e.hasAttribute('data-component')) ? true : false;
    }


    get ['get-component-structure'] () {
        let e = document.createElement('div');

        e.setAttribute('data-component', '');
        e.setAttribute('data-component-id', 'title');
        e.setAttribute('data-component-method','assign-text-nodes');
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
        let s = this['get-component-sections'];

        for (let key in s)
            if (s.hasOwnProperty(key))
                if (this['has-assertion'](s[key]))
                    console.log(key, s[key]);

        console.log('%csections', 'color:red;font-weight:bold;', s);

        return this;
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

