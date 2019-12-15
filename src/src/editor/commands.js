const commands = {
	wrapLink(editor, href) {
		// if (!editor.isLinkActive()) {
		editor.wrapInline({ type: 'link', data: { href } });
		// }
	},

	unwrapLink(editor) {
		editor.unwrapInline('link');
	}
};

export default commands;
