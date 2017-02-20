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
	// @classtype: @static //

	static get browser () {
		/**
		*** Set Browser API.
		*
		* Finds required extension API.
		* Browser instance by Firefox, Chrome for Chrome.
		* Accessed using Extension.browser[method].
		*
		**/

		// @return: @type: @object //
		return window.browser ? window.browser : window.chrome;
	}

	static get manifest () {
		/**
		*** Fetch Extension meta.
		*
		* Get manifest document for extension.
		* Uses Extension.browser to find document.
		* Assumes manifest matches browser specifications.
		*
		**/

		// @return: @type: @object //
		return Extension.browser.runtime.getManifest();
	}
};

