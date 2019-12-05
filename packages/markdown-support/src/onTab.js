import { Block } from 'slate';
export default function onTab(event, editor, next) {
	const { startBlock } = editor.value;

	if (startBlock.type !== 'list-item') {
		return next();
	}
	event.preventDefault();

}
