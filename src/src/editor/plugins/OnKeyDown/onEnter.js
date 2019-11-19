import { Block } from 'slate';
import { whenTrueOrNext, chain } from './utils';
import { onEnterInblockQuote } from './services/blockQuote';
import { onEnterInHeading } from './services/heading';

export default function onEnter(event, editor, next) {
	const { value } = editor;
	const { startBlock, selection } = value;
	if (selection.isExpanded) return next();
	if (!startBlock) return next();

	const endOffset = selection.end.offset;

	if (startBlock.type === 'image') {
		event.preventDefault();
		return editor.splitBlock(10).setBlocks({
			type: 'paragraph',
			text: '',
			isVoid: false
		});
	}

	if (startBlock.type.match(/^heading/)) {
		event.preventDefault();
		if (endOffset > 0) {
			return editor.splitBlock().setBlocks('paragraph');
		} else {
			return editor.splitBlock().moveToStartOfPreviousBlock().setBlocks('paragraph');
		}
	}
	if (startBlock.type === 'list-item' && startBlock.text.replace(' ', '').length === 0) {
		//如果为空则unwrapBlock,此时需要查询它最亲近的父辈分是否 有 list类型，如果有则直接unwrap父辈
		const startParent = editor.value.document.getClosest(startBlock.key, (i) => {
			return [ 'bulleted-list', 'ordered-list', 'todo-list' ].includes(i.type);
		});

		const insertItem = Block.create({
			type: 'list-item',
			object: 'block',
			nodes: [ { object: 'text', text: '' } ]
		});

		const grandParent = editor.value.document.getClosest(startParent.key, (i) => {
			console.log('i==>', i);
			return [ 'bulleted-list', 'ordered-list', 'todo-list' ].includes(i.type);
		});

		if (grandParent) {
			editor.removeNodeByKey(startBlock.key); //	console.log('has grandpa', grandParent);
			editor.insertNodeByKey(grandParent.key, grandParent.nodes.size, insertItem).moveForward(1);
		} else {
			editor.setBlocks('paragraph').unwrapBlock(startParent.type);
		}

		return;
	}

	const flow = chain(
		whenTrueOrNext(() => onEnterInblockQuote(startBlock, { editor, event })), // 在blockQuote中回车
		whenTrueOrNext(() => onEnterInHeading(startBlock, { editor, event })) // 在 heading中回车
	);

	if (flow()) {
		return;
	}

	return next();
}
