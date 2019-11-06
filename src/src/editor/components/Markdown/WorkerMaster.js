let blobURL = null;
let markedWorker = null;
const MasterWorker = (markdownString, { options, timeout = 2000 }) => {
	if (!markedWorker || markedWorker.working) {
		if (markedWorker) {
			markedWorker.terminate();
		}
		const blob = new Blob([document.querySelector('#markedWorker').textContent]);
		blobURL = blobURL || window.URL.createObjectURL(blob); //createObjectURL 会在整个浏览器生命周期持续
		markedWorker = new Worker(blobURL);
		const errorHandler = function(event) {
			console.error('转码出错', event);
		};
		markedWorker.onerror = errorHandler;

		return new Promise((resolve, reject) => {
			const markedTimeout = setTimeout(() => {
				markedWorker.terminate();
				markedWorker.working = false;
				throw new Error('Marked took too long!');
			}, timeout);
			markedWorker.onmessage = e => {
				clearTimeout(markedTimeout);
				const html = e.data;
				markedWorker.terminate();
				markedWorker.working = false;
				resolve(html);
			};

			markedWorker.working = true;
			markedWorker.postMessage({ type: 'lexer' || 'html', data: markdownString, options });
		});
	}
};

export default MasterWorker;
