import { markDownToLexer } from './index';
import { Block } from 'slate';
export const testIfMatchListGrammer = (text, { editor, event }) => {
	const textWithSpace = text.replace(/^((?:\d{0,3}.))/, '$1 ');
	const { startBlock } = editor.value;
	const listType = startBlock.type;
	if (listType === 'list-item') {
		if (text.replace(' ', '') === '') {
			//如果为空则unwrapBlock,此时需要查询它最亲近的父辈分是否 有 list类型，如果有则直接unwrap父辈
			// const startParent = editor.value.document.getParent(startBlock.key);
			const startParent = editor.value.document.getClosestBlock(startBlock.key, i => {
				return i.type === 'bulleted-list' || i.type === 'numbered-list';
			});
			console.group('empty process');
			if (startParent) {
				const grandpa = editor.value.document.getClosestBlock(startParent.key, i => {
					return i.type === 'list-item';
				});
				editor
					.unwrapBlock(startParent.type)
					.setBlocks(grandpa ? 'list-item' : 'paragraph')
					.focus();
			} else {
				editor.unwrapBlock('list-item').setBlocks('paragraph');
				console.log('no parent match bulleted-list or numbered-list');
			}
			console.groupEnd('empty process');
			return true;
		}
	}
	if (listType === 'paragraph') {
		const startParent = editor.value.document.getClosestBlock(startBlock.key, i => {
			return i.type === 'bulleted-list' || i.type === 'numbered-list';
		});
		if (startParent) {
			editor.unwrapBlock(startParent.type).setBlocks('paragraph');
		}
	}
	const tokens = markDownToLexer(textWithSpace);
	if (tokens && tokens.length) {
		console.group('testIfMatchListGrammer');
		console.log('matched list grammer', listType);
		console.log(tokens);

		const isList = listType === 'bulleted-list' || listType === 'numbered-list' ? true : false;
		let mark = false;
		for (const token of tokens) {
			switch (token.type) {
				case 'list_start': {
					if (!isList) {
						if (token.ordered) {
							editor.wrapBlock('numbered-list');
						} else {
							editor.wrapBlock('bulleted-list');
						}
					} else {
						const paragraph = Block.create('list-item');
						const { node } = editor.value;
						editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
					}
					mark = true;
					break;
				}
				case 'list_item_start': {
					editor.setBlocks('list-item');
					mark = true;
					break;
				}
				case 'list_item_end': {
					const textNode = editor.value.startBlock.getFirstText();
					// getPath用于 获取当前对象和目标key的通路 例如 List[0] ,List[9,1,2]; 第N个子孙（迭代）
					// console.log(editor.value.startBlock.getPath(textNode.key));
					// console.log(editor.value.document.getPath(textNode.key));
					const withOutNumberText = text.replace(/^\s{0,3}\d{0,3}.\s+/, ''); //用于去除 markdown的编号 例如 '1. ' or '999. '
					if (withOutNumberText !== '') {
						editor
							.setTextByPath(editor.value.document.getPath(textNode.key), withOutNumberText)
							.insertBlock('list-item');
					} else {
						editor.unwrapBlock(listType);
					}
					mark = false;
					break;
				}
				case 'list_end': {
					mark = true;
					break;
				}
				default: {
					console.groupEnd('testIfMatchListGrammer');
					break;
				}
			}
		}
		console.groupEnd('testIfMatchListGrammer');
		if (mark) return true;
	} else return false;
};
