import { markDownToLexer } from '../utils';

export const onEnterInblockQuote = (startBlock, { editor, event }) => {
	if (startBlock.type !== 'block-quote') {
		return false;
	}
	if (startBlock.text.endsWith('\n')) {
		editor
			.moveFocusBackward(1)
			.delete()
			.unwrapBlock('block-quote')
			.insertBlock('paragraph');
		return true;
	}
	event.preventDefault();
	editor.insertText('\n');
	return true;
};
// > dadsdasdas
export const testIfMatchBlockQuoteGrammer = (startBlock, { editor, event }) => {
	const tokens = markDownToLexer(startBlock.text);
	if (tokens) {
		console.log('testIfMatchBlockQuoteGrammer', tokens);
		if (tokens.some(i => i.type === 'blockquote_end')) {
			return insertBlockQuote(startBlock, { editor, event });
		}
	}
	return false;
};

export const insertBlockQuote = (startBlock, { editor, event }) => {
	event.preventDefault();
	const { text, key } = startBlock.getFirstText();
	editor
		.setBlocks({
			type: 'block-quote'
		})
		.setTextByPath(editor.value.document.getPath(key), text.slice(2));
	// 或者	editor.moveFocusToStartOfNode(startBlock).delete();
	return true;
};
