import { isModKey } from './utils';
import onEnterHandler from './onEnter';
import onBackspaceHandler from './onBackspace';
import onDash from './onDash';

export default function KeyboardBehavior(options = {}) {
	const onEnter = options.onEnter || onEnterHandler;
	const onBackspace = options.onBackspace || onBackspaceHandler;

	return {
		onKeyDown(e, editor, next) {
			// 当文本被全选或者清空时 ， 去除任何mark样式并设置为段落
			if (editor.value.document.text.length === 0) {
				[ 'bold', 'italic', 'deleted', 'underlined', 'code', 'inserted' ].forEach((mark) => {
					editor.removeMark(mark);
				});
			}
			if (isModKey(e)) return next();
			switch (e.key) {
				case 'Enter':
					return onEnter(e, editor, next);
				case 'Backspace':
					return onBackspace(e, editor, next);
				case '-':
					return onDash(e, editor, next);
				default:
					return next();
			}
		}
	};
}
