export default function onEscape(_e, editor, next) {
	const { value } = editor;
	const { startBlock, selection } = value;

	if (selection.isExpanded || !startBlock) {
		return next();
	}

	editor.moveToEndOfNode(startBlock).moveForward(1);
	return next();
}
