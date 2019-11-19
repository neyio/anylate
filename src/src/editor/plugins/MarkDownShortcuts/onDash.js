export default function onDash(ev, editor, next) {
	const { value } = editor;
	const { startBlock, selection } = value;
	if (selection.isExpanded) return next();

	if (startBlock.type.match(/heading/)) return next();
	// if (editor.isSelectionInTable()) return next();

	const chars = startBlock.text.slice(0, selection.start.offset).replace(/\s*/g, '');

	if (chars === '--') {
		ev.preventDefault();
		return editor
			.moveFocusToStartOfNode(startBlock)
			.delete()
			.setBlocks(
				{
					type: 'horizontal-rule',
					isVoid: true
				},
				{ normalize: false }
			)
			.insertBlock('paragraph')
			.moveToStart();
	}

	return next();
}
