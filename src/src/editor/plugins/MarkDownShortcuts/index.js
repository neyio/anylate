import isHotkey from 'is-hotkey';
import onSpace from './onSpace';
import onDash from './onDash';
import onBacktick from './onBacktick';
import onTab from './onTab';
import commands from './commands';
import ifFlow from './utils/flow';
// import { isModKey } from './utils/index';
const MarkdownShortcuts = (options = {}) => {
	const isDash = isHotkey('-');
	const isBacktick = isHotkey('`');
	const isSpace = isHotkey(' ');
	const isTab = isHotkey('tab');
	const setParagraph = isHotkey('mod+p');
	const setHeading1 = isHotkey('mod+1');
	const setHeading2 = isHotkey('mod+2');
	const setHeading3 = isHotkey('mod+3');
	const setHeading4 = isHotkey('mod+4');
	const setHeading5 = isHotkey('mod+5');
	const setHeading6 = isHotkey('mod+6');
	const setOrderedList = isHotkey('mod+shift+l');
	// const insertCode = isHotkey('mod+shift+c');
	const setBulletedList = isHotkey('mod+l');
	const setTodoList = isHotkey('mod+o');
	const setBlockQuote = isHotkey('mod+m');
	const insertHr = isHotkey('mod+h');
	const saveToJson = isHotkey('mod+s');
	return {
		commands,
		onKeyDown(e, editor, next) {
			const { value } = editor;
			const { startBlock } = value;
			if (!startBlock) return next();
			if (startBlock.type.match(/code/)) return next();
			// if (!isModKey(e)) return next();
			return ifFlow(
				[ isDash, options.onDash || onDash ],
				[ isBacktick, options.onBacktick || onBacktick ],
				[ isSpace, options.onSpace || onSpace ],
				[ isTab, options.onTab || onTab ],
				// [ insertCode, () => editor.handlerShortCut('code') && e.preventDefault() ],
				[ setParagraph, () => editor.handlerShortCut('paragraph') && e.preventDefault() ],
				[ setHeading1, () => editor.handlerShortCut('heading1') && e.preventDefault() ],
				[ setHeading2, () => editor.handlerShortCut('heading2') && e.preventDefault() ],
				[ setHeading3, () => editor.handlerShortCut('heading3') && e.preventDefault() ],
				[ setHeading4, () => editor.handlerShortCut('heading4') && e.preventDefault() ],
				[ setHeading5, () => editor.handlerShortCut('heading5') && e.preventDefault() ],
				[ setHeading6, () => editor.handlerShortCut('heading6') && e.preventDefault() ],
				[ insertHr, () => editor.handlerShortCut('hr') && e.preventDefault() ],
				[ setOrderedList, () => editor.handlerShortCut('ordered') && e.preventDefault() ],
				[ setBulletedList, () => editor.handlerShortCut('bulleted') && e.preventDefault() ],
				[ setTodoList, () => editor.handlerShortCut('undo') && e.preventDefault() ],
				[ setBlockQuote, () => editor.handlerShortCut('block-quote') && e.preventDefault() ],
				[
					saveToJson,
					() => {
						e.preventDefault();
						console.log('调试用', JSON.stringify(editor.value.toJSON(editor.value.document.key)));
					}
				],
				[ () => true, () => next() ]
			)(e, editor, next);
		}
	};
};

export default MarkdownShortcuts;
