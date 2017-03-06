/**	
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/

class Copy extends HTMLElement {

	static get HTML () {
		return document.createElement('div').insertNode('div', {'copycat-contents':''}, function (d) {
			d.insertNode('div', {'data-grid-assign':'padding', class:'tp-xs-6 bp-xs-6'}, function (d) {
				d.insertNode('div', {'data-grid-assign':'padding', class:'lp-xs-6 rp-xs-6'}, function (d) {
					d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
						d.insertNode('div', {'data-grid-assign':'padding', class:'tp-xs-6 bp-xs-6'}, function (d) {
							d.insertNode('div', {'data-grid-assign':'padding', class:'lp-xs-9 rp-xs-9'}, function (d) {
								d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
									d.insertNode('hgroup', {class:'bm-xs-8'}, function (g) {
										g.insertNode('h3', {class:'font-xs-6 font-weight-bold'}, function (h) {
											h.insertNode('span', {class:'line-xs-10'}, function (s) {
												s.insertNode('span', 'Lorem Ipsum Dolor Set Amet Aqui. Qauestor Imperium And More.', 
													{'data-copycat-section':'', 'data-section-id':'title', 'data-method':'insert-string'});
											});
										});
										g.insertNode('h4', {class:'font-xs-5 font-weight-400'}, function (h) {
											h.insertNode('span', {class:'line-xs-8'}, function (s) {
												s.insertNode('span', '@Senate Latium', 
													{'data-copycat-section':'', 'data-section-id':'source', 'data-method':'insert-string'});
											});
										});
									});
									d.insertNode('p', {class:'font-xs-8 font-weight-400'}, function (p) {
										p.insertNode('span', {class:'line-xs-14'}, function (s) {
											s.insertNode('span', 
												{'data-copycat-section':'', 'data-section-id':'text', 'data-method':'insert-string'});
										});
									});
								});
								d.insertNode('hr', {'data-copy-section':'content-break'});

								d.insertNode('div', {'data-copy-section':'content-group'}, function (d) {
									d.insertNode('div', {'data-grid-assign':'flex', class:'flex-xs dir-xs-row wrap-xs-wrap'}, function (d) {
										d.insertNode('aside', {'data-meta-tag':'','data-meta-key':'sample', style:'background-color:aquamarine;'}, function (a) {
											a.insertNode('div', {'data-grid-assign':'padding', class:'tp-xs-3 bp-xs-3'}, function (d) {
												d.insertNode('div', {'data-grid-assign':'padding', class:'lp-xs-4 rp-xs-4'}, function (d) {
													d.insertNode('div', {'data-grid-assign':'flex', class:'flex-xs dir-xs-row align-xs-center'}, function (d) {
														d.insertNode('div', {'data-copy-section':'content-group', class:'rm-xs-1'}, function (d) {
															d.insertNode('p', {class:'font-xs-5 font-weight-600'}, function (p) {
																p.insertNode('span', {class:'line-xs-10'}, function (s) {
																	s.insertNode('span', 'copycat', {style: 'color:rgba(0,0,0,0.65);'});
																});
															});
														});
														d.insertNode('div', {'data-copy-section':'content-group', class:'lm-xs-1'}, function (d) {
															d.insertNode('div', {'data-grid-assign':'flex', class:'flex-xs dir-xs-row align-xs-center'}, function (d) {
																d.insertSvgNode('svg', {x:'0px', y:'0px', viewBox:'0 0 50 50', style:'enable-background:new 0 0 50 50;', 'xml:space':'preserve', width:'16', height:'16', 'shape-rendering': 'geometricPrecision'}, function (s) {
																	s.insertSvgNode('circle', {cx:'25', cy:'25', r:'25', style:'fill: rgba(0, 0, 0, 0.15);'});
																	s.insertSvgNode('polyline', {style:"fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;", points:"16,34 25,25 34,16"})
																	s.insertSvgNode('polyline', {style:"fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;", points:"16,16 25,25 34,34"});
																}).addEventListener('click', function () {
																	a.remove();
																}, false);
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});	
	}

	get sections () {
		for (var i = 0, s = {}, e = this.querySelectorAll('[data-copycat-section]'); i < e.length; i++)
			Object.assign(s, {[e[i].getAttribute('data-section-id')]:e[i]});

		return s;
	}

	set properties (props) {
		let s = this.sections;

		for (let key in props)
			if (s.hasOwnProperty(key))
				if (s[key].dataset.method && this[s[key].dataset.method])
					this[s[key].dataset.method](s[key], props[key], (s[key].dataset.args ? JSON.parse(s[key].dataset.args) : {}));

		return s;
	}

	set assign (props) {
		if (props instanceof Object && Object.keys(props).length)
			for (let key in props)
				if (props.hasOwnProperty(key))
					this.props[key] = props[key];

		return this.props;
	}

	distribute (props) {
		this.assign = props;

		this.properties = this.assign;
	}


	['insert-string'] (element, string, args) {
		element.removeTextNode().insertTextNode(string);
	}

	connectedCallback () {
		this.appendChild(Copy.HTML);
	}

	disconnectedCallback () {
		console.log("%ccopycat says: %cmeow meow!", "color: #b7b7b7; font-style:italic;", "color: #333333; font-weight:400;"); 

	}

	constructor () {
		super();

		this.props = {};
	}
}