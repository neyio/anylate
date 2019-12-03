import isHotkey from 'is-hotkey';

const toggleMark = (editor, type, next) => {
	editor.removeMark('code').toggleMark(type);
};

export default function markShortcuts(e, editor, next) {
	isHotkey('cmd+');
	const isBold = isHotkey('mod+b');
	const isItalic = isHotkey('mod+i');
	const isUnderlined = isHotkey('mod+u');
	const isDeleted = isHotkey('mod+d');
	const isLink = isHotkey('mod+k');
	return [
		[ isBold, () => toggleMark(editor, 'bold', next) ],
		[ isItalic, () => toggleMark(editor, 'italic', next) ],
		[ isUnderlined, () => toggleMark(editor, 'underlined', next) ],
		[ isDeleted, () => toggleMark(editor, 'deleted', next) ],
		[ isLink, () => editor.wrapLink('about:blank') && e.preventDefault() ]
	];
}
