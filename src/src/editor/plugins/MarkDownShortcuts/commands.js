import { Block } from 'slate';
export default {
	insertListItem: (
		editor,
		regs = [
			{ reg: /^\s*\d\./, type: 'ordered' },
			{ reg: /^\s*-\s*\[ {1}\]/, type: 'undo' },
			{ reg: /^\s*-\s*\[x{1}\]/, type: 'finished' },
			{ reg: /^\* +/, type: 'bulleted' }
		]
	) => {
		const { startBlock } = editor.value;
		const subType = regs.find((item) => item.reg.test(startBlock.text + ' '));
		if (!subType) {
		}
		const isCurrentBlockListItem = startBlock.type === 'list-item';
		const wrapType =
			subType.type === 'ordered' ? 'ordered-list' : subType.type === 'bulleted' ? 'bulleted-list' : 'todo-list';
		const data = wrapType === 'todo-list' ? { checked: subType.type === 'finished' ? true : false } : {};
		if (isCurrentBlockListItem) {
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
			const wrapType = subType.type === 'ordered' ? 'ordered-list' : 'bulleted-list';
			editor.wrapBlock(wrapType);
			editor.moveFocusToStartOfNode(startBlock).delete().setBlocks({ type: 'list-item', data });
		}
		return editor;
	}
};
