import { Mark, Node, Text } from 'slate';
import { markDownToInlineLexer } from '../utils';

const onInlineLexer = ({ editor, event }, next) => {
	next();
	// console.log('here is inline');
	// const { value } = editor;
	// const { selection, startBlock } = value;
	// const tokens = markDownToInlineLexer(startBlock.text, []);
	// console.log('whicktokens?', tokens);
	// if (selection.isExpanded || selection.start.offset === 0) {
	// 	return next();
	// }

	//

	// const string = node.text;
	// const texts = Array.from(node.texts());
	// // const { startText } = editor.value;
	// const startText = node.getFirstText();
	// let [objectText, pathList] = texts.shift();
	// // const realPath = editor.value.document.getPath(objectText.key);
	// // console.log('init', realPath);
	// // const newnode = node.addMark(pathList, Mark.fromJSON({ type: 'bold' }));
	// // console.log(newnode);
	// // node.addMark(Mark.fromJSON({ type: 'bold' }));
	// editor.setNodeByKey(startText.key, {
	// 	...startText,
	// 	marks: List([Mark.fromJSON({ type: 'bold' })])
	// });
	// const newnode = startText.addMark(Mark.fromJSON({ type: 'bold' }));
	// editor.replaceNodeByKey(startText.key, newnode);
	// // editor.toggleMark('bold');
	// console.log(startText);
	// const endstart = editor.value.document.getNode(startText.key);
	// console.log('TCL: decorateNode -> endstart', endstart);
	//
	const { startBlock } = editor.value;
	const startText = startBlock.getFirstText();
	console.log('startblock', startBlock);
	const tokens = markDownToInlineLexer(startBlock.text, []);

	console.group('INLINE LEXER');
	console.log(startText);
	console.log(tokens);

	editor.replaceNodeByKey(
		startText.key,
		Text.fromJSON({ text: 'hello world', marks: [Mark.fromJSON({ type: 'bold' })] })
	);
	console.log(editor.value.startBlock);

	console.groupEnd('INLINE LEXER');

	return;
};
export default onInlineLexer;
