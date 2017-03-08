class Component extends HTMLElement {

    
    get ['component-properties'] () {
        for (var i = 0, o = {}, s = this.querySelectorAll('[data-component-property]'), l = s.length; i < l; i++)
            if (s[i].hasAttribute('data-component-id'))
                Object.assign(o, {[s[i].getAttribute('data-component-id')]:s[i]});

        return o;
    }

    ['propegate-method'] (e, prop) {

        let a = e.getAttribute('data-component-method');

        if (e.__proto__ instanceof Element && this[a] instanceof Function)
            this[a](e, prop, (e.hasAttribute('data-method-arguments') ? 
                JSON.parse(e.getAttribute('data-method-arguments')) : {}));

        return e;
    }

    ['propegate-properties'] (properties) {
        let s = this['component-properties'];

        for (let key in s)
            if (s.hasOwnProperty(key))
                if (s[key].hasAttribute('data-component-property') && s[key].hasAttribute('data-component-id'))
                    if (properties[s[key].getAttribute('data-component-id')])
                        this['propegate-method'](s[key], properties[s[key].getAttribute('data-component-id')])

        return this;
    }

    assertMethods (methods) {
        if (methods instanceof Object && Object.keys(methods).length)
            for (let key in methods)
                if (methods.hasOwnProperty(key))
                    if (!this.__proto__[key] && methods[key] instanceof Function)
                        this[key] = methods[key];
        
        return this;
    }

    assertProperties (properties) {
        if (properties instanceof Object && Object.keys(properties).length)
            for (let key in properties)
                if (properties.hasOwnProperty(key))
                    this.properties[key] = properties[key];

        return this;
    }

    propegateProperties (properties) {
        
        this.assertProperties(properties);
        
        this['propegate-properties'](this.properties);

        return this;
    }

    constructor () {
        
        super(arguments);

        Object.assign(this, {properties: new Object()});
    }
}











class Copy extends Component {

    get ['component-architecture'] () {
        let e = document.createElement('div');
        e.setAttribute('data-component-base', '');
        
        let s = document.createElement('div');
        s.setAttribute('data-component-property', '');
        s.setAttribute('data-component-id', 'title');
        s.setAttribute('data-component-method', 'append-text-nodes');
      
        e.appendChild(s);

        return e;
    }



    disconnectedCallback () {
        console.log('%cCopyCat %cflees!', 'color:#bbcccb;font-style:italic;', 'color:#bbcccb;font-weight:bold;');
    }

    connectedCallback () {

        this.appendChild(this['component-architecture']);

        this['propegate-properties'](this.properties);

        console.log('%cA new CopyCat %cpounces %conto the page!', 'color:#bbcccb;font-style:italic;', 'color:#bbcccb;font-weight:bold;', 'color:#bbcccb;font-style:italic;');

        delete this.__proto__['component-architecture'], this.__proto__.connectedCallback;
    }

    constructor () {
        super();
    }
}


customElements.define('copycat-copy', Copy);

var i = document.createElement('copycat-copy');

i.assertProperties({'title':'hello world'})

if (window.clear) clear();

document.body.appendChild(i);

