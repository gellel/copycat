!function () {

	let keyMap = {67:false, 91:false};

	window.addEventListener("keydown", function (keyEvent) {
		(keyEvent.keyCode === 67 || keyEvent.keyCode === 91) ? 
			keyMap[keyEvent.keyCode] = true : keyMap = {67:false, 91:false};
	}, false);

	window.addEventListener("keyup", function () {
		if (keyMap[67] && keyMap[91]) {
			SendCopiedText();
			keyMap = {67:false, 91:false};
		};
	}, false);



	function SendCopiedText () {

		let copied__object = {
			text: window.getSelection().toString(),
			date: new Date().toDateString(),
			href: window.location.href
		};

		if (!copied__object.text) return;
		
		console.log("cmd + c success.");

		chrome.runtime.sendMessage(copied__object, function () {

			
		});
	};

}();