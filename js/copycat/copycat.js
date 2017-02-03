/**
*
* @file: Mozilla and Chrome extension.
* @version: 1.0.0.0
* @author: gellel
* @github: https://github.com/gellel/copycat
* @copyright: MIT.
*
**/


class CopyCat {
	/**
	** CopyCat extension class API.
	*
	* Manages Chrome and FireFox extension events.
	*
	**/

	static get browser () {
		/**
	    *** CopyCat.browser;
	    *
	    * Sets browser method object.
	    * Static property.
	    * Returns @object.
	    *
	    **/

		return window.browser ? browser : chrome;
	}

	static get manifest () {
		/**
	    *** CopyCat.meta;
	    *
	    * Fetches extension manifest metadata. 
	    * Static property.
	    * Returns @object.
	    *
	    **/

		return CopyCat.browser.runtime.getManifest();
	}


};

