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
			case '1':
				e.preventDefault();
				return editor.setBlocks('heading1');
			case '2':
				e.preventDefault();
				return editor.setBlocks('heading2');
			case '3':
				e.preventDefault();
				return editor.setBlocks('heading3');
			case '4':
				e.preventDefault();
				return editor.setBlocks('heading4');
			case '5':
				e.preventDefault();
				return editor.setBlocks('heading5');
			case '6':
				e.preventDefault();
				return editor.setBlocks('heading6');
			case 'h':
				e.preventDefault();
				return editor.insertBlock('paragraph').setBlocks('horizontal-rule').insertBlock('paragraph');
			default:
				return next();
		}
	}
});
