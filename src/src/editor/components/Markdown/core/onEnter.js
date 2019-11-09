import { whenTrueOrNext, chain } from '../utils/index';
import { testIfMatchListGrammer } from '../services/list';

const onEnter = (event, editor, next) => {
	const { value } = editor;
	const { selection } = value;
	const { isExpanded } = selection;
	//排除选区
	if (isExpanded) {
		return next();
	}
	const { startBlock } = value;
	if (startBlock.type === 'block-quote') {
		if (startBlock.text.endsWith('\n')) {
			editor
				.moveFocusBackward(2)
				.delete()
				.unwrapBlock('block-quote')
				.insertBlock('paragraph');
			return null;
		}
		event.preventDefault();
		return editor.insertText('\n');
	}
	if (startBlock.type === 'heading') {
		event.preventDefault();
		editor.splitBlock().setBlocks('paragraph');
	}

	const flow = chain(whenTrueOrNext(() => testIfMatchListGrammer(startBlock.text, { editor, event })));

	if (!flow()) {
		console.log('未捕获流程');
		next();
	}
	return;
};
export default onEnter;
