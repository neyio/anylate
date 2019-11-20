import isDataUri from 'is-data-uri';
import dataUriToBlob from './data-uri-to-blob';
import imageToDataUri from './image-to-data-uri';

function loadImageFile(url, callback) {
	if (isDataUri(url)) {
		const file = dataUriToBlob(url);
		setTimeout(() => {
			callback(null, file);
		});
	} else {
		imageToDataUri(url, (err, uri) => {
			const file = dataUriToBlob(uri);
			callback(err, file);
		});
	}
}

export default loadImageFile;
