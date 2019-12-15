import onEscape from './onEscape';
import onEnter from './onEnter';
import onBackspace from './onBackspace';

export default function JumpOutBlock(
	options = [],
	{ onBackspace: onBackspaceForce, onEscape: onEscapeForce, onEnter: onEnterForce } = {}
) {
	return {
		onKeyDown(event, editor, next) {
			switch (event.key) {
				case 'Escape':
					return (onEscapeForce && onEscapeForce(event, editor, next)) || onEscape(event, editor, next);
				case 'Enter':
					return (onEnterForce && onEnterForce(event, editor, next)) || onEnter(options)(event, editor, next);
				case 'Backspace':
					return (
						(onBackspaceForce && onBackspaceForce(event, editor, next)) || onBackspace(event, editor, next)
					);
				default:
					return next();
			}
		}
	};
}
