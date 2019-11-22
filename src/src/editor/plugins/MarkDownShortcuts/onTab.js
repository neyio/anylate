import { Block } from 'slate';
export default function onTab(event, editor, next) {
	const { startBlock } = editor.value;

	if (startBlock.type !== 'list-item') {
		return next();
	}
	event.preventDefault();
	const sibling = editor.value.document.getPreviousSibling(startBlock.key);
	console.log('sibling', sibling);
	const parent = editor.value.document.getParent(startBlock.key);
	console.log('TCL: onTab -> parent', parent);

	editor.removeNodeByKey(startBlock.key);

	if (!sibling) {
		return next();
	}
	const lastChild = sibling.nodes.last();
	console.log('lastChild', lastChild);

	if ([ 'ordered-list', 'bulleted-list', 'todo-list' ].includes(lastChild.type)) {
		const insertItem = Block.create({
			type: 'list-item',
			object: 'block',
			data: {},
			nodes: [ { object: 'text', text: ' ' } ]
		});
		editor.insertNodeByKey(lastChild.key, lastChild.nodes.size, insertItem).moveForward(1);
	} else {
		const insertItem = Block.create({
			type: parent.type,
			object: 'block',
			nodes: [
				{
					type: 'list-item',
					object: 'block',
					data: {},
					nodes: [ { object: 'text', text: ' ' } ]
				}
			]
		});
		editor.insertNodeByKey(sibling.key, sibling.nodes.size, insertItem).moveForward(1);
	}
}
