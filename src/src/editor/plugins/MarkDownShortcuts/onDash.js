export default function onDash(ev, editor, next) {
	const { value } = editor;
	const { startBlock, selection } = value;
	if (selection.isExpanded) return next();

	if (startBlock.type.match(/heading/)) return next();
	// if (editor.isSelectionInTable()) return next();

	const chars = startBlock.text.slice(0, selection.start.offset).replace(/\s*/g, '');

	if (chars === '--') {
		ev.preventDefault();
		editor
			.moveFocusToStartOfNode(startBlock)
			.delete()
			.setBlocks('horizontal-rule')
			.insertBlock('paragraph')
			.focus();
		return true;
	}

	return next();
}
