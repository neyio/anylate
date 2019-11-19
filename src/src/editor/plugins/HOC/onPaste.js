import { getEventTransfer } from 'slate-react';
import isUrl from 'is-url';
import { wrapLink, unwrapLink } from './link';
export default function onPaste(event, editor, next) {
	if (editor.value.selection.isCollapsed) return next();

	const transfer = getEventTransfer(event);
	const { type, text } = transfer;
	if (type !== 'text' && type !== 'html') return next();
	if (!isUrl(text)) return next();

	if (this.hasLinks()) {
		editor.command(unwrapLink);
	}

	editor.command(wrapLink, text);
}
