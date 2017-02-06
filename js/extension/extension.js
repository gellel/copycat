/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


class Extension {

	static get browser () {
		return window.browser ? browser : chrome;
	}

	static get manifest () {
		return Extension.browser.runtime.getManifest();
	}

};

