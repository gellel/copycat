class Copy extends HTMLElement {

    ['get-component-structure'] () {
        let e = document.createElement('div');

        e.setAttribute('data-copycat-section', '');
        e.setAttribute('data-copycat-section-id', 'title');

        return e;
    }

    ['get-component-sections'] () {
        let s = this.querySelectorAll('[data-copycat-section]');

        for (var i = 0, o = {}, l = s.length; i < l; i++)
            if (s[i].hasAttribute('data-copycat-section-id'))
                Object.assign(o, {[s[i].getAttribute('data-copycat-section-id')]:s[i]})

        return o;
    }

    ['propegate-properties'] (properties) {
        console.log('HELLO WORLD')

        /* assert dynamic */
        let s = this['get-component-sections']();

        console.log(s);
    }

    propegateProperties (properties) {
        if (properties instanceof Object && Object.keys(properties).length)
            for (let key in properties)
                if (properties.hasOwnProperty(key))
                    this.properties[key] = properties[key];
        

        this['propegate-properties'](this.properties);

        return this;
    }

    set assertProperties (properties) {
        if (properties instanceof Object && Object.keys(properties).length)
            for (let key in properties)
                if (properties.hasOwnProperty(key))
                    this.properties[key] = properties[key];

        return this.properties;
    }

    disconnectedCallback () {
        console.log('%cCopyCat %cflees!', 'color:#bbcccb;font-style:italic;', 'color:#bbcccb;font-weight:bold;');
    }

    connectedCallback () {
        /* set inner */
        this.appendChild(this['get-component-structure']());
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

document.body.appendChild(i);