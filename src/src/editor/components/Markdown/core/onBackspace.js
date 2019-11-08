/**
 * On backspace, if at the start of a non-paragraph, convert it back into a
 * paragraph node.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */

const onBackspace = (event, editor, next) => {
	const { value } = editor;
	const { selection } = value;
	if (selection.isExpanded) {
		return next();
	}
	if (selection.start.offset !== 0) {
		return next();
	}

	const { startBlock } = value;
	if (startBlock.type === 'paragraph') {
		return next();
	}

	if (value.isCollapsed && value.startBlock.type === 'check-list-item' && value.selection.startOffset === 0) {
		editor.setBlocks('paragraph');
		return;
	}

	event.preventDefault();

	editor.setBlocks('paragraph');
	if (startBlock.type === 'list-item') {
		editor.unwrapBlock('bulleted-list');
	}
};

export default onBackspace;
