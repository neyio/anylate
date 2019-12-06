import getItemDepth from './getItemDepth';
import getCurrentItem from './getCurrentItem';

function descListItemDepth(editor) {
	const { value } = editor;
	const { document } = value;
	const currentItem = getCurrentItem(value, value.startBlock);
	if (!currentItem) {
		return editor;
	}

	const currentList = document.getParent(currentItem.key);
	const depth = getItemDepth(editor);
	if (depth == 1) {
		// return editor;
		return editor.unwrapBlock('list-item').unwrapBlock(currentList.type); //增补如果depth为1 直接跳出。
	}
	const parentItem = document.getParent(currentList.key);
	const parentList = document.getParent(parentItem.key);
	const followingItems = currentList.nodes.skipUntil((i) => i === currentItem).rest();
	const willEmptyCurrentList = currentList.nodes.size === followingItems.size + 1;

	if (!followingItems.isEmpty()) {
		const sublist = Block.create({
			object: 'block',
			type: currentList.type,
			data: currentList.data
		});
		editor.insertNodeByKey(currentItem.key, currentItem.nodes.size, sublist, { normalize: false });
		editor.moveNodeByKey(currentItem.key, parentList.key, parentList.nodes.indexOf(parentItem) + 1, {
			normalize: false
		});
		followingItems.forEach((item, index) =>
			editor.moveNodeByKey(item.key, sublist.key, sublist.nodes.size + index, { normalize: false })
		);
	} else {
		editor.moveNodeByKey(currentItem.key, parentList.key, parentList.nodes.indexOf(parentItem) + 1);
	}

	if (willEmptyCurrentList) {
		editor.removeNodeByKey(currentList.key);
	}

	return editor;
}

export default descListItemDepth;
