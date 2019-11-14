import { markDownToLexer } from '../utils';

export const onEnterInHeading = (startBlock, { editor, event }) => {
	if (startBlock.type === 'heading') {
		event.preventDefault();
		editor.splitBlock().setBlocks('paragraph');
		return true;
	}
	return false;
};

export const testIfMatchHeadingGrammer = (startBlock, { editor, event }) => {
	const tokens = markDownToLexer(startBlock.text);
	if (tokens) {
		console.log('testIfMatchBlockQuoteGrammer', tokens);
		const token = tokens.find(i => i.type === 'heading');
		if (token) {
			insertHeading(startBlock, { editor, event }, token);
			return true;
		}
	}
	return false;
};

export const insertHeading = (startBlock, { event, editor }, token) => {
	event.preventDefault();
	const { text } = token;
	const { key } = startBlock.getFirstText();
	editor
		.setBlocks('heading')
		.setNodeByKey(startBlock.key, { data: { depth: token.depth } })
		.setTextByPath(editor.value.document.getPath(key), text);
	// .focus();
	// editor.moveFocusToStartOfNode(startBlock).delete();
	return true;
};
