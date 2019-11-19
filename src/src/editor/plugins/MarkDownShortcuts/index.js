import onSpace from './onSpace';
import onDash from './onDash';
import onBacktick from './onBacktick';
import onTab from './onTab';
const MarkdownShortcuts = (options = {}) => ({
	onKeyDown(e, editor, next) {
		const { value } = editor;
		const { startBlock } = value;
		if (!startBlock) return next();
		if (startBlock.type.match(/code/)) return next();
		switch (e.key) {
			case '-':
				return (options.onDash || onDash)(e, editor, next);
			case '`':
				return (options.onBacktick || onBacktick)(e, editor, next);
			case ' ':
				return (options.onSpace || onSpace)(e, editor, next);
			case 'Tab':
				return (options.onTab || onTab)(e, editor, next);
			default:
				return (options.default || next)();
		}
	}
});

export default MarkdownShortcuts;
