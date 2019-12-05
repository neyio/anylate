export default {
	getClosestListItem(editor, key) {
		const { document } = editor.value;
		return document.getClosest(key, (block) => block.type === 'list-item');
	}
};
