
window.addEventListener('click', evt => {
	
	let target = evt.target;
	while (target && target.tagName.toLowerCase() !== 'a') {
		target = target.parentElement;
	}
	if (target) {
		var url = target instanceof SVGAElement ? target.href.baseVal : target.href;
		const isFrame = window.frameElement && window.frameElement.nodeName == "IFRAME";
		if (url.startsWith('file://') || 
			(isFrame && url.startsWith('javascript:void(window.open('))) {
			evt.preventDefault();				

			if(isFrame && url.startsWith('javascript:void(window.open(')) {
				var result = url.match(/javascript\:void\(window\.open\(\'(.*?)\'/)
				if(result.length > 0) {
					url = result[0].replace("javascript:void(window.open('", "").replace("'", "");
				}
			}	

			try {
				chrome.runtime.sendMessage({
					method: 'openLocalFile',
					localFileUrl: url,
				});
			} catch (e) {}
		}
	}
}, {
	capture: true,
});
