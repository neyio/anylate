export const onEnterInHeading = (startBlock, { editor, event }) => {
	if (startBlock.type === 'heading') {
		event.preventDefault();
		editor.splitBlock().setBlocks('paragraph');
		return true;
	}
	return false;
};

export const insertHeading = (startBlock, { event, editor }, token) => {
	event.preventDefault();
	editor
		.setBlocks('heading')
		.setNodeByKey(startBlock.key, { data: { depth: token.depth } })
		.focus();
	editor.moveFocusToStartOfNode(startBlock).delete();
	return true;
};
