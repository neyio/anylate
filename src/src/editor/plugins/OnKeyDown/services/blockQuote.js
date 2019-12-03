export const onEnterInblockQuote = (startBlock, { editor, event }) => {
	if (startBlock.type !== 'block-quote') {
		return false;
	}
	if (startBlock.text.endsWith('\n')) {
		editor.moveFocusBackward(1).delete().unwrapBlock('block-quote').insertBlock('paragraph');
		return true;
	} else if (startBlock.text === '') {
		editor.unwrapBlock('block-quote').setBlocks('paragraph');
	} else {
		event.preventDefault();
		editor.insertText('\n');
		return true;
	}
};

export const insertBlockQuote = (startBlock, { editor, event }) => {
	event.preventDefault();
	const { text, key } = startBlock.getFirstText();
	editor
		.setBlocks({
			type: 'block-quote'
		})
		.setTextByPath(editor.value.document.getPath(key), text.slice(2));
	return true;
};
