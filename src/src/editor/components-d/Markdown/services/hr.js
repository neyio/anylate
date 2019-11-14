export const insertHr = (startBlock, { editor, event }) => {
	event.preventDefault();
	editor
		.moveFocusToStartOfNode(startBlock)
		.delete()
		.setBlocks('hr')
		.insertBlock('paragraph')
		.focus();
	return true;
};
