// copied from https://github.com/ianstormtaylor/slate-plugins ,for some reasons ，it updated 1years ago, i may need to diy it ,so copied .
import isImage from 'is-image';
import isUrl from 'is-url';
// import logger from 'slate-dev-logger';
import { Block, KeyUtils } from 'slate';
import { extname } from 'path';
import { getEventTransfer, getEventRange } from 'slate-react';
import loadImageFile from './load-image-file';

/**
 * Insert images on drop or paste.
 *
 * @param {Object} options
 * @property {Function} insertImage
 * @property {Array} extensions (optional)
 * @return {Object} plugin
 */

function DropOrPasteImages(options = {}) {
	let { insertImage, extensions } = options;

	if (options.applyTransform) {
		console.warn(
			'0.6.0',
			'The `applyTransform` argument to `slate-drop-or-paste-images` has been renamed to `insertImage` instead.'
		);
		insertImage = options.applyTransform;
	}

	if (!insertImage) {
		throw new Error('You must supply an `insertImage` function.');
	}

	/**
   * Check file extension against user-defined options.
   *
   * @param {Type} string
   * @return {Boolean}
   */

	function matchExt(type) {
		let accepted = false;

		for (const ext of extensions) {
			if (type.includes(ext)) accepted = true;
		}

		return accepted;
	}

	/**
   * Apply the change for a given file and update the editor with the result.
   *
   * @param {Change} change
   * @param {Blob} file
   * @return {Promise}
   */

	function asyncApplyChange(change, file) {
		const { editor } = change;

		return Promise.resolve(insertImage(change, file)).then(() => {
			editor.onChange(change);
		});
	}

	/**
   * On drop or paste.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Function} next
   * @return {State}
   */

	function onInsert(event, change, next) {
		const { editor } = change;
		const transfer = getEventTransfer(event);
		console.log('TCL: onInsert -> transfer', transfer);
		const range = getEventRange(event, editor);

		switch (transfer.type) {
			case 'files':
				return onInsertFiles(event, change, next, transfer, range);
			case 'html':
				return onInsertHtml(event, change, next, transfer, range);
			case 'text':
				return onInsertText(event, change, next, transfer, range);
			default:
				return next();
		}
	}

	/**
   * On drop or paste files.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Function} next
   * @param {Object} transfer
   * @param {Range} range
   * @return {Boolean}
   */

	function onInsertFiles(event, change, next, transfer, range) {
		const { files } = transfer;

		for (const file of files) {
			if (extensions) {
				const type = file.type;
				const [ , ext ] = type.split('/');
				if (!matchExt(ext)) continue;
			}

			if (range) {
				change.select(range);
			}

			asyncApplyChange(change, file);
		}
	}

	/**
   * On drop or paste html.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Function} next
   * @param {Object} transfer
   * @param {Range} range
   * @return {Boolean}
   */

	function onInsertHtml(event, change, next, transfer, range) {
		const { editor } = change;
		const { html } = transfer;
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const body = doc.body;
		const firstChild = body.firstChild;
		if (firstChild.nodeName.toLowerCase() !== 'img') return next();

		const src = firstChild.src;

		if (extensions) {
			const ext = extname(src).slice(1);
			if (!matchExt(ext)) return next();
		}

		loadImageFile(src, (err, file) => {
			if (err) return;

			editor.change((c) => {
				if (range) {
					c.select(range);
				}

				asyncApplyChange(c, file);
			});
		});
	}

	/**
   * On drop or paste text.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Function} next
   * @param {Object} transfer
   * @param {Range} range
   * @return {Boolean}
   */

	function onInsertText(event, change, next, transfer, range) {
		const { editor } = change;
		const { text } = transfer;
		if (!isUrl(text)) return next();
		if (!isImage(text)) return next();

		loadImageFile(text, (err, file) => {
			if (err) return;
			console.log('loadImageFile');
			editor.change((c) => {
				if (range) {
					c.select(range);
				}

				asyncApplyChange(c, editor, file);
			});
		});
	}

	/**
   * Return the plugin.
   *
   * @type {Object}
   */

	return {
		onDrop: onInsert,
		onPaste: onInsert,
		commands: {
			insertImageFile: (editor, file) => {
				const { onImageUploadStart, onShowToast, onImageUploadStop } = editor.props;
				const { uploadImage } = options;
				if (!uploadImage) {
					console.error('uploadImage callback must be defined to handle image uploads.');
				}

				if (onImageUploadStart) onImageUploadStart();

				let key = KeyUtils.create();

				const alt = '';
				// load the file as a data URL
				const placeholderSrc = URL.createObjectURL(file);

				const node = Block.create({
					key,
					type: 'image',
					isVoid: true,
					data: { src: placeholderSrc, alt, loading: true }
				});

				editor.insertBlock(node).insertBlock('paragraph').onChange(editor);

				// withoutSaving prevents this op from being added to the history, so you can't
				// undo back to showing the upload placeholder. 'onChange' addition is a hack
				// to get around a bug in slate-drop-or-paste-images
				editor.withoutSaving((editor) => {
					// now we have a placeholder, start the image upload. This could be very fast
					// or take multiple seconds. The user may further edit the content during this time.
					uploadImage &&
						uploadImage(file)
							.then((src) => {
								if (!src) {
									throw new Error('No image url returned from uploadImage callback');
								}
								// replace the placeholder with the final image if we can. The user may have
								// removed it during upload so we need to take that into account.
								try {
									editor.setNodeByKey(key, {
										data: { src, alt, loading: false }
									});
								} catch (err) {
									console.warn('Image placeholder could not be found', err);
								}
							})
							.catch((err) => {
								// if there was an error during upload, remove the placeholder image
								editor.removeNodeByKey(key);
								if (onShowToast) {
									onShowToast('Sorry, an error occurred uploading the image');
								}
								throw err;
							})
							.finally(() => {
								if (onImageUploadStop) onImageUploadStop();
							});
				});
			}
		}
	};
}

/**
 * Export.
 *
 * @type {Function}
 */

export default DropOrPasteImages;
