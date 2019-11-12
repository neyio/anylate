import { Mark, Node, Text } from 'slate';
import { markDownToInlineLexer } from '../utils';

const onInlineLexer = ({ editor, event }, next) => {
	return next();

	const { startBlock } = editor.value;
	const startText = startBlock.getFirstText();
	const path = editor.value.document.getPath(startBlock.key);
	console.log('startblock', startBlock);
	const tokens = markDownToInlineLexer(startBlock.text, []);

	// editor.removeNodeByKey(path);
	// startBlock.nodes.empty();
	console.group('INLINE LEXER');
	// console.log(startText);
	console.log('tokens=>', tokens);
	tokens.forEach((token, index) => {
		console.log(token);
		editor.insertNodeByPath(
			path,
			index,
			Text.fromJSON({
				text: typeof token.content === 'string' ? token.content : '需要处理下',
				marks: [Mark.fromJSON({ type: token.type })]
			})
		);
	});

	// console.log(startBlock.text, startBlock.nodes.last());
	editor.removeNodeByKey(startBlock.nodes.last().key);

	console.groupEnd('INLINE LEXER');

	return;
};
export default onInlineLexer;
