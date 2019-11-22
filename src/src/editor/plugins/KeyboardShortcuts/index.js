import { isModKey } from './utils';

const toggleMark = (editor, type, next) => {
	editor.removeMark('code').toggleMark(type);
};

export default () => ({
	onKeyDown(e, editor, next) {
		if (!isModKey(e)) return next();
		switch (e.key) {
			case 'b':
				e.preventDefault();
				return toggleMark(editor, 'bold', next);
			case 'i':
				e.preventDefault();
				return toggleMark(editor, 'italic', next);
			case 'u':
				e.preventDefault();
				return toggleMark(editor, 'underlined', next);
			case 'd':
				e.preventDefault();
				return toggleMark(editor, 'deleted', next);
			case 'k':
				e.preventDefault();
				return editor.wrapLink('');
			default:
				return next();
		}
	}
});
