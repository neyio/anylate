import { Block } from 'slate';
const getSubType = (startBlock) => {
	const regs = [
		{ reg: /^\s*\d\./, type: 'ordered' },
		{ reg: /^\s*-\s*\[ {1}\]/, type: 'undo' },
		{ reg: /^\s*-\s*\[x{1}\]/, type: 'finished' },
		{ reg: /^\* +/, type: 'bulleted' }
	];
	const subType = regs.find((item) => item.reg.test(startBlock.text + ' '));
	return subType && subType.type;
};

export const ifHasLinks = (editor) => {
	const { value } = editor;
	return value.inlines.some((inline) => inline.type === 'link');
};

export default {
	insertListItem: (editor, forceSubType, forceSwitch) => {
		const { startBlock } = editor.value;
		let subType = forceSubType || getSubType(startBlock);
		if (!subType) {
			console.warn('this subType is not included!');
			return editor;
		}
		const isCurrentBlockListItem = startBlock.type === 'list-item';
		const wrapType =
			subType === 'ordered' ? 'ordered-list' : subType === 'bulleted' ? 'bulleted-list' : 'todo-list';
		const data = wrapType === 'todo-list' ? { checked: subType === 'finished' ? true : false } : {};
		if (isCurrentBlockListItem) {
			if (forceSwitch) {
				const parent = editor.value.document.getClosestBlock(editor.value.startBlock.key, (i) => {
					return i.type === 'bulleted-list' || i.type === 'ordered-list' || i.type === 'todo-list';
				});
				editor.withoutNormalizing((editor) => {
					editor.setNodeByKey(parent.key, { type: wrapType });
					parent.nodes.forEach((node) => {
						console.log('in forEach', node.key);
						editor.setNodeByKey(node.key, { type: 'list-item', data });
					});
				});
				return editor;
			}

			const ListItem = Block.create({
				type: 'list-item',
				object: 'block',
				nodes: [
					{
						type: wrapType,
						object: 'block',
						nodes: [
							{
								object: 'block',
								type: 'list-item',
								data: data,
								nodes: [
									{
										object: 'text',
										text: ''
									}
								]
							}
						]
					}
				]
			});

			editor.removeNodeByKey(startBlock.key);
			editor.insertBlock(ListItem);
		} else {
			const wrapType = subType === 'ordered' ? 'ordered-list' : 'bulleted-list';
			editor.wrapBlock(wrapType);
			editor.moveFocusToStartOfNode(startBlock).delete().setBlocks({ type: 'list-item', data });
		}
		return editor;
	},
	handlerShortCut: (editor, type) => {
		const { startBlock } = editor.value;
		if (type === 'hr') {
			return editor.focus().insertBlock('paragraph').setBlocks('horizontal-rule');
		}
		if (type === 'math') {
			return editor.focus().insertMathBlock();
		}
		if ([ 'ordered', 'undo', 'finished', 'bulleted' ].includes(type)) {
			return editor.focus().moveToStartOfNode(startBlock).insertListItem(type, true);
		}
		editor.focus().moveToEnd().setBlocks(type);
		return editor;
	},
	wrapLink(editor, href) {
		if (!ifHasLinks(editor)) {
			editor.wrapInline({ type: 'link', data: { href } });
		} else {
			editor.unwrapInline('link');
		}
	},
	unwrapLink(editor) {
		editor.unwrapInline('link');
	}
};
