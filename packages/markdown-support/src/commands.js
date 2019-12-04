import wrapInList from './list/wrapInList';

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
		const { startBlock, selection } = editor.value;
		let subType = forceSubType || getSubType(startBlock);
		if (!subType) {
			return editor;
		}
		// const isCurrentBlockListItem = startBlock.type === 'list-item';
		const firstText = startBlock.getFirstText();
		editor.removeTextByKey(firstText.key, 0, startBlock.text.slice(0, selection.start.offset).length);
		const wrapType =
			subType === 'ordered' ? 'ordered-list' : subType === 'bulleted' ? 'bulleted-list' : 'todo-list';
		const data = wrapType === 'todo-list' ? { checked: subType === 'finished' ? true : false } : {};
		return wrapInList(editor, wrapType, data);
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
