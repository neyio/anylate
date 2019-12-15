export function wrapLink(editor, href) {
	editor.wrapInline({
		type: 'link',
		data: { href }
	});

	editor.moveToEnd();
}

export function unwrapLink(editor) {
	editor.unwrapInline('link');
}

export const ifHasLinks = (editor) => {
	const { value } = editor;
	return value.inlines.some((inline) => inline.type === 'link');
};
