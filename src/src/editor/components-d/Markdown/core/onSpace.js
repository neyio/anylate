import { markDownToLexer } from '../utils/index';
import { insertHeading } from '../services/heading';
import { insertHr } from '../services/hr';
import { insertBlockQuote } from '../services/blockQuote';
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
	let tempToken = [];
	for (let token of tokens) {
		const { type } = token;

		if (type === 'list-item' && startBlock.type === 'list-item') {
			return next();
		}
		// 类型具有： "code" | "hr" | "html" | "table" | "text" | "space" | "heading" | "blockquote_start" | "blockquote_end" | "list_start" | "loose_item_start" | "list_item_start" | "list_item_end" | "list_end" | "paragraph"

		switch (type) {
			case 'heading': {
				return insertHeading(startBlock, { event, editor }, token);
			}
			case 'hr': {
				return insertHr(startBlock, { editor, event });
			}
			case 'blockquote_start': {
				tempToken = [token];
				continue;
			}
			case 'paragraph': {
				tempToken.push(token);
				continue;
			}
			case 'blockquote_end': {
				tempToken.push(token);
				return insertBlockQuote(startBlock, { editor, event }, tempToken);
			}
			default:
				return next();
		}
	}
	return next();
};

export default onSpace;
