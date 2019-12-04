import commands from './commands';
import onEnter from './onEnter';
import onTab from './onTab';
import onBackspace from './onBackspace';
export default function editList() {
	return {
		onKeyDown(event, editor, next) {
			switch (event.key) {
				case 'Enter':
					return onEnter(event, editor, next);
				case 'Tab':
					return onTab(event, editor, next);
				case 'Backspace':
					return onBackspace(event, editor, next);
				default:
					return next();
			}
		},
		commands
	};
}
