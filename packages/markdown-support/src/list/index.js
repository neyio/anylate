export function isList({ type }) {
	return [ 'bulleted-list', 'ordered-list', 'todo-list' ].includes(type);
}

export function splitListItem(editor) {
	const { value } = editor;
	const currentItem = getCurrentItem(value);
	if (!currentItem) {
		return editor;
	}

	const splitOffset = value.startOffset;

	return editor.splitDescendantsByKey(currentItem.key, value.startKey, splitOffset);
}

export function getCurrentItem(value, block) {
	const { document } = value;

	if (!block) {
		if (!value.selection.anchor.key) return null;
		block = value.startBlock;
	}

	const parent = document.getParent(block.key);
	return parent && parent.type === 'list-item' ? parent : null;
}
