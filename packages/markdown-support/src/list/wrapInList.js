import { List } from 'immutable';
import { isList } from './index';

function wrapInList(editor, type = 'bulleted-list', data = {}) {
	console.log('TCL: wrapInList -> type', type, data);
	const mostRootSectionBlocks = mostRootDifferentSectionArea(editor.value);
	console.log('TCL: wrapInList -> mostRootSectionBlocks');
	// Wrap in container
	editor.wrapBlock(
		{
			type,
			data
		},
		{ normalize: false }
	);
	mostRootSectionBlocks.map((node) => {
		if (isList(node)) {
			console.log('inside mostRootSectionBlocks ');
			node.nodes.forEach((item) => editor.unwrapNodeByKey(item.key, { normalize: false }));
		} else {
			editor.wrapBlockByKey(node.key, 'list-item', {
				normalize: false
			});
		}
	});

	return editor.normalize();
}

/**
 * 返回 最原始分叉的区间部分
 */
function mostRootDifferentSectionArea(value) {
	const range = value.selection;
	const { document } = value;

	const startBlock = document.getClosestBlock(range.isForward ? range.anchor.key : range.focus.key);
	const endBlock = document.getClosestBlock(!range.isForward ? range.anchor.key : range.focus.key);

	if (startBlock === endBlock) {
		const list = new List([ startBlock ]);
		return list;
	}
	const ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);
	const startPath = ancestor.getPath(startBlock.key);
	const endPath = ancestor.getPath(endBlock.key);

	return ancestor.nodes.slice(startPath[0], endPath[0] + 1);
}

export default wrapInList;
