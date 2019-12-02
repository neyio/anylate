export default function onEscape(event, editor, next) {
	const { value } = editor;
	const { startBlock, selection } = value;
	if (selection.isExpanded) return next();
	if (!startBlock) return next();

	editor.moveToEndOfNode(startBlock).moveForward(1);

	return next();
}
