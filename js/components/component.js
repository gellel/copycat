/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class HTMLComponent extends HTMLElement {

	/* superclass for custom elements.
	 * inherits from HTMLElement object.
	 * intended to emulate some features of react.
	 * all component data is buried in component key of class.
	 * keys defined component are intended to be constants. 
	 * functions to be inherited by sections must be defined in class scope. 
	 * section functions are bound to the class scope. 
	 * bound sections receive data as assigned in the properties section. */

	constructor () {
		Object.defineProperties(
			Object.assign(super(), {}), {
				component: {
					writable: false,
					enumerable: true,
					value: Object.defineProperties({}, {
						structure: { 
							writable: false, 
							enumerable: false, 
							value: this 
						},
						base: { 
							writable: true, 
							enumerable: false, 
							value: this 
						},
						parentConstructor: {
							writable: false,
							enumerable: false,
							value: Object.getPrototypeOf(
								this.constructor).name
						},
						stateReference: {
							writable: false,
							enumerable: false,
							value: 'data-component-state'
						},
						sectionReference: {
							writable: false,
							enumerable: false,
							value: 'data-component-section'
						},
						methodReference: {
							writable: false,
							enumerable: false,
							value: 'data-component-method'
						},
						propertyChange: {
							writable: false,
							enumerable: false,
							value: 'onProperty%sChange'
						},
						stateChange: {
							writable: false,
							enumerable: false,
							value: 'onState%sChange'
						},
						HTMLElementFormat: {
							enumerable: true,
							get: function () {
								/* @return: @type: @string. */
								return this.structure.shadowRoot ? 
									'HTMLComponent' : 'HTMLCustomElement';
							}
						},
						definedSections: { 
							get: function () {
								/* fetch defined component structure. */
								let a = this.anchor;
								/* fetch defined component sections. */
								let s = Array.prototype.slice.call((a && a.querySelectorAll ? 
									a.querySelectorAll('[' + this.sectionReference + ']') : [])).filter(function (i) { 
										if (i.getAttribute instanceof Function) 
											if (i.getAttribute(this.sectionReference)) 
												return i; }.bind(this));
								/* set keys as section ids. match values as sections. */
								for (var i = 0, l = s.length, o = {}; i < l; i++)
									Object.assign(o, {[s[i].getAttribute(this.sectionReference)]: s[i]});
								/* @return: @type: @object. */
								return o;
							}
						},
						boundSections: {
							get: function () {
								/* set component container. */
								let o = {};
								/* fetch defined component sections. */
								let s = this.definedSections;
								/* fetch method bound sections from sections. */
								for (let key in s)
									if (s.hasOwnProperty(key))
										if (s[key].getAttribute instanceof Function)
											if (this.structure[s[key].getAttribute(this.methodReference)] instanceof Function)
												Object.assign(o, {[key]:s[key]});
								/* @return: @type: @object. */
								return o;
							}
						},
						anchor: { 
							get: function () {
								/* @return: @type: @element. */
								return this.base; 
							}, 
							set: function (e) { 
								/* set base key value as element or shadow root. */
								this.base = (e = e instanceof Element && 
									(e === this.structure || this.structure.contains(e)) ? 
										e :this.structure.shadowRoot ? this.structure.shadowRoot : this.base); 
							}
						},
						states: { 
							writable: false, 
							enumerable: false, 
							value: new Proxy({}, {
								set: function (obj, prop, value) {
									/* set method string. find component state change method. */
									let f = this.component.base[this.component.stateChange.replace('%s', 
										(prop.charAt(0).toUpperCase() + prop.slice(1)))];
									/* test method bound to component. execute method. */
									if (f instanceof Function) f(value, prop);
									/* @return: @type: @object. */
									return Object.assign(obj, {[prop]:value}); 
								}.bind(this)
							})
						},
						properties: { 
							writable: false, 
							enumerable: true, 
							value: new Proxy({}, {
								set: function (obj, prop, value) {
									/* set method string. find component property change method. */
									let f = this.component.base[this.component.propertyChange.replace('%s', 
										(prop.charAt(0).toUpperCase() + prop.slice(1)))];
									/* test method bound to component. execute method. */
									if (f instanceof Function) f(value, prop);
									/* @return: @type: @object. */
									return Object.assign(obj, {[prop]:value}); 
								}.bind(this)
							}) 
						}
					})
				},
				availableMethods: {
					enumerable: true,
					get: function () {
						/* set keys container. */
						let c = [];
						/* iterate for keys in component. */
						for (let key in this) 
							/* test if key is unique property and is not component. */
							if (this.hasOwnProperty(key) && !(key === 'component') && !(key === 'availableMethods'))
								/* test if key is function. append to array. */
								if (this[key] instanceof Function)
									c.push(key);
						/* @return: @type: @array. */
						return c;
					}
				},
				propagateProperties: {
					writable: false,
					enumerable: true,
					value: function () {
						/* fetch component properties. */
						let p = this.component.properties;
						/* fetch bound sections. */
						let s = this.component.boundSections;
						/* iterate for properties. match both keys in sets. call bound method. */
						for (let key in p)
							if (p.hasOwnProperty(key) && s.hasOwnProperty(key))
								this[s[key].getAttribute(
									this.component.methodReference)](p[key], key, s[key]);
						/* @return: @type: @element. */
						return this;
					}
				},
				propagateProperty: {
					writable: false,
					enumerable: true,
					value: function (property) {
						/* fetch specified component propertie. */
						let p = this.component.properties[property];
						/* fetch specified bound section. */
						let s = this.component.boundSections[property];
						/* test property defined and bound. */
						if (p && s) this[s.getAttribute(this.component.methodReference)](p, property, s);
						/* @return: @type: @element. */
						return this;
					}
				},
				appendProperties: {
					writable: false,
					enumerable: true,
					value: function (properties) {
						/* test argument is object type. */
						if (properties instanceof Object)
						/* iterate for properties */
							for (let key in properties)
								/* test unique key. */
								if (properties.hasOwnProperty(key))
									/* set key value pair. */
									this.appendProperty(key, properties[key]);
						/* @return: @type: @element. */
						return this;
					}
				},
				appendProperty: {
					writable: false,
					enumerable: true,
					value: function (property, value) {
						/* fetch component properties. */
						let p = this.component.properties;
						/* test if property is defined. assign key value if undefined. */
						if ((p && typeof property === 'string') && (!p.hasOwnProperty(property))) p[property] = value;
						/* @return: @type: @element. */
						return this;
					}
				},
				editProperty: {
					writable: false,
					enumerable: true,
					value: function (property, value) {
						/* test property set. set property value if defined. */
						if (this.propertyExists(property)) 
							this.component.properties[property] = value;
						/* @return: @type: @element. */
						return this;
					}
				},
				removeProperty: {
					writable: false,
					enumerable: true,
					value: function (property) {
						/* fetch component properties. */
						let p = this.component.properties;
						/* test if property is defined. */
						if ((p && typeof property === 'string') && (p.hasOwnProperty(property))) {
							/* fetch defined component sections. */
							let s = this.component.definedSections[property];
							/* test if section has property matching parameter. remove key map. */
							if (s && s.removeAttribute instanceof Function) {
								/* set key maps. */
								let c = [this.component.sectionReference, this.component.methodReference];
								/* iterate for key maps. remove bound references. */
								for (let i = 0, l = c.length; i < l; i++)
									s.removeAttribute(c[i]);
							}
							/* remove key property. */
							delete p[property];
						}
						/* @return: @type: @element. */
						return this;
					}
				},
				propertyExists: {
					writable: false,
					enumerable: true,
					value: function (property) {
						/* @return: @type: @boolean. */
						return this.component.properties.hasOwnProperty(property) ? true : false;
					}
				},
				propagateState: {
					writable: false,
					enumerable: true,
					value: function (state) {
						/* fetch component states. */
						let s = this.component.states;
						/* test state is defined. */
						if (s.hasOwnProperty(state)) {
							s[state] = true;
							this.setAttribute(this.component.stateReference, state);
						}
						/* @return: @type: @element. */
						return this;
					}
				},
				deminishState: {
					writable: false,
					enumerable: true,
					value: function (state) {
						/* fetch component states. */
						let s = this.component.states;
						/* test state is defined. */
						if (s.hasOwnProperty(state) && this.stateIsSet(state)) this.removeAttribute(this.component.stateReference);
						/* @return: @type: @element. */
						return this; 
					}
				},
				appendStates: {
					writable: false,
					enumerable: true,
					value: function (states) {
						/* test argument is object type. */
						if (states instanceof Object)
						/* iterate for properties */
							for (let key in states)
								/* test unique key. */
								if (states.hasOwnProperty(key))
									/* set key value pair. */
									this.appendState(key, states[key]);
						/* @return: @type: @element. */
						return this;
					}
				},
				appendState: {
					writable: false,
					enumerable: true,
					value: function (state, value) {
						/* fetch component states. */
						let s = this.component.states;
						/* test if state is defined. assign key value if undefined. */
						if ((s && typeof state === 'string') && (!s.hasOwnProperty(state)))
							s[state] = (value = typeof value === 'boolean' ? (value === true ? true : false) : false);
						/* test if state is active. propagate state. */
						if (s[state]) this.propagateState(state);
						/* @return: @type: @element. */
						return this;
					}
				},
				removeState: {
					writable: false,
					enumerable: true,
					value: function (state) {
						/* fetch component states. */
						let s = this.component.properties;
						/* test if state is defined. */
						if ((s && typeof state === 'string') && (s.hasOwnProperty(state))) {
							/* test state is set for element. */
							if (this.getAttribute(this.component.stateReference) === state) {
								/* remove state attribute from component structure. */
								this.removeAttribute(this.component.stateReference);
								/* remove key state. */
								delete s[state];
							}
						}
						/* @return: @type: @element. */
						return this;
					}
				},
				stateExists: {
					writable: false,
					enumerable: true,
					value: function (state) {
						/* @return: @type: @boolean. */
						return this.component.states.hasOwnProperty(state) ? 
							true : false;
					}
				},
				stateIsSet: {
					writable: false,
					enumerable: true,
					value: function (state) {
						/* test type. */
						if (!typeof state === 'string') return false;
						/* @return: @type: @boolean. */
						return this.getAttribute(this.component.stateReference) === state ? 
							true : false;
					}
				},
				sectionExists: {
					writable: false,
					enumerable: true,
					value: function (section) {
						/* @return: @type: @boolean. */
						return this.component.definedSections.hasOwnProperty(section) ? 
							true : false;
					}
				},
				methodExists: {
					writable: false,
					enumerable: false,
					value: function (method) {
						/* @return: @type: @boolean. */
						return this[method] instanceof Function ? 
							true : false;
					}
				},
				setShadow: {
					writable: false,
					enumerable: true,
					value: function (mode) {
						/* test shadow is set. */
						if (!this.shadowRoot) this.attachShadow({ 
							mode: (typeof mode === 'string' ? (mode === 'open' ? mode : 'closed') : 'open') });
						/* set anchor as shadow root. */
						this.component.anchor = this.shadowRoot;
						/* @return: @type: @element. */
						return this;
					}
				},
				getAssignedProperties: {
					writable: false,
					enumerable: true,
					value: function () {
						/* set component properties. */
						let p = this.component.properties;
						/* set object. */
						let o = new Object();
						/* iterate for object keys. set keys for copy. */
						for (let key in p) o[key] = p[key];
						/* @return: @type: @object. */
						return o;
					}
				}
			});
	}
}

/* register element. */
customElements.define(
	'element-component', HTMLComponent);
