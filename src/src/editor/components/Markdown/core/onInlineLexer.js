import { markDownToInlineLexer } from '../utils';

const onInlineLexer = ({ editor, event }, next) => {
	console.log('here is inline');
	const { value } = editor;
	const { selection, startBlock } = value;
	const tokens = markDownToInlineLexer(startBlock.text, []);
	console.log('whicktokens?', tokens);
	if (selection.isExpanded || selection.start.offset === 0) {
		// console.log('impossible inline lexer');

		return next();
	}

	return next();
};
export default onInlineLexer;
