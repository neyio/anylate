import renderBlock from './renderBlock';
import renderMark from './renderMark';
import renderInline from './renderInline';
import schema from './schema';
import aliOss from 'ali-oss';
const client = new aliOss({
	accessKeyId: '',
	accessKeySecret: '',
	bucket: 'mostyouth',
	endpoint: 'https://oss-cn-shanghai.aliyuncs.com',
	timeout: '60s',
	bucketWithEndpoint: 'https://oss.mostyouth.cn'
});
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

export default function AnyLateRender(
	options = {
		upload: (blob, callback) => {
			console.log('请实现上传代码 (blob)=>void', blob.length);
			callback('error');
			client.put('anylate/1.png', dataUriToBlob(blob)).then((result) => {
				console.log(result);
				// callback(null, result);
			});
		}
	}
) {
	return {
		renderBlock: renderBlock(options),
		renderMark,
		renderInline,
		schema
	};
}
