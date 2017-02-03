/**
*
* @file: Mozilla and Chrome extension handler.
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
	* Handles cross-platform operations.
	*
	**/

	get browser () {
		/**
	    *** CopyCat.browser;
	    *
	    * Fetches extension API. 
	    * Uses browser object for FireFox.
	    * Static property.
	    * Returns @object.
	    *
	    **/

		return browser ? browser : chrome;
	}

	get meta () {
		/**
	    *** CopyCat.meta;
	    *
	    * Attributes for extension. 
	    * Static property.
	    * Returns @object.
	    *
	    **/
		return { manifest: CopyCat.browser.runtime.getManifest(), status: { message: {}, event: {} } };
	}

};

