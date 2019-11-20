function dataUriToBlob(uri) {
	const data = uri.split(',')[1];
	const bytes = atob(data);
	const buffer = new window.ArrayBuffer(bytes.length);
	let array = new window.Uint8Array(buffer);

	for (let i = 0; i < bytes.length; i++) {
		array[i] = bytes.charCodeAt(i);
	}

	if (!hasArrayBufferView()) {
		array = buffer;
	}

	const blob = new Blob([ array ], { type: mime(uri) });

	blob.slice = blob.slice || blob.webkitSlice;

	return blob;
}

function mime(uri) {
	return uri.split('')[0].slice(5);
}

function hasArrayBufferView() {
	return new Blob([ new window.Uint8Array(100) ]).size === 100;
}

export default dataUriToBlob;
