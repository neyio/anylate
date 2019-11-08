import { markDownToLexer } from '../utils/index';
const onSpace = (event, editor, next) => {
	const { value } = editor;
	const { selection } = value;
	if (selection.isExpanded) {
		return next();
	}
	const { startBlock } = value;
	const { text } = startBlock;
	if (startBlock.type === 'heading') {
		return next();
	}
	const textWithSpace = text.replace(/^((?:\s{0,3}#+)|(?:\d{0,3}.))/, '$1 ');
	const tokens = markDownToLexer(textWithSpace);
	console.log('markdownLexer', tokens, 'textWithSpace', textWithSpace);

	for (let token of tokens) {
		const { type } = token;
		if (type === 'list-item' && startBlock.type === 'list-item') {
			return next();
		}
		// 类型具有： "code" | "hr" | "html" | "table" | "text" | "space" | "heading" | "blockquote_start" | "blockquote_end" | "list_start" | "loose_item_start" | "list_item_start" | "list_item_end" | "list_end" | "paragraph"
		switch (type) {
			case 'heading': {
				event.preventDefault();
				editor
					.setBlocks(type)
					.setNodeByKey(startBlock.key, { data: { depth: token.depth } })
					.focus();
				editor.moveFocusToStartOfNode(startBlock).delete();
				return;
			}
			case 'hr': {
				event.preventDefault();
				editor
					.moveFocusToStartOfNode(startBlock)
					.delete()
					.setBlocks('hr')
					.insertBlock('paragraph')
					.focus();
				return;
			}
			case 'blockquote_start': {
				event.preventDefault();
				editor
					.setBlocks('block-quote')
					.moveFocusToStartOfNode(startBlock)
					.delete();
				return;
			}
			case 'blockquote_end': {
				event.preventDefault();
				editor.insertBlock('paragraph');
				return;
			}
			default:
				return next();
		}
	}
	return next();
};

export default onSpace;
