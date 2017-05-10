const app = new Object();

Object.defineProperties(app, {
	storage: {
		writable: false,
		enumerable: true,
		value: Object.defineProperties({}, {
			copies: {
				writable: false,
				enumerable: true,
				value: Object.defineProperties({}, {
					store: {
						writable: false,
						enumerable: true,
						value: function (copies, namespace) {
							if (copies instanceof Array)
								Extension.browser.storage.sync.get(namespace, function (storage) {
									if (storage[namespace])
										Extension.browser.storage.sync.set({[namespace]: 
											Object.assign(storage[namespace], {copies: copies.map(function (i) {  
												if (i.hasOwnProperty('getAssignedProperties')) 
													return i.getAssignedProperties(); }) }) }); });
						}
					},
					remove: {
						writable: false,
						enumerable: true,
						value: function (copies, key, namespace) {
							if (copies instanceof Array) {
								let d = undefined;
								for (let i = 0, l = copies.length; i < l && (d === undefined); i++)
									if (copies[i] === key) 
										d = copies.splice(i, 1); 

								if (d) this.store(copies, namespace);
							}
						}
					},
					add: {
						writable: false,
						enumerable: true,
						value: function (copies, content, namespace) {
							if (copies instanceof Array)
								if (content instanceof Object && Object.keys(content).length)
									this.store(copies.append(content), namespace);
						}
					}
				})
			}
		})
	},
	construct: {
		writable: false,
		enumerable: true
		value: Object.defineProperties({}, {
			copy: {
				writable: false,
				enumerable: true,
				value: function (copies, namespace) {
					if (copies instanceof Array)
						for (let i = 0, l = copies.length; i < l; i++)
							copies[i] = document.createElement('copycat-element').appendProperties(copies[i]);	
				}
			}
		})
	}
});