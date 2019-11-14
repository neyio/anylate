import { whenTrueOrNext, chain } from '../utils/index';
import { testIfMatchListGrammer } from '../services/list';
import { onEnterInblockQuote, testIfMatchBlockQuoteGrammer } from '../services/blockQuote';
import { onEnterInHeading, testIfMatchHeadingGrammer } from '../services/heading';

const onEnter = (event, editor, next) => {
	const { value } = editor;
	const { selection } = value;
	const { isExpanded } = selection;
	//排除选区
	if (isExpanded) {
		return next();
	}

	const { startBlock } = value;

	const flow = chain(
		whenTrueOrNext(() => onEnterInblockQuote(startBlock, { editor, event })), // 在blockQuote中回车
		whenTrueOrNext(() => onEnterInHeading(startBlock, { editor, event })) // 在 heading中回车
	);

	if (flow()) {
		return;
	}

	const markdownSupport = chain(
		whenTrueOrNext(() => testIfMatchHeadingGrammer(startBlock, { editor, event })),
		whenTrueOrNext(() => testIfMatchListGrammer(startBlock.text, { editor, event })), //是否满足是list的grammer
		whenTrueOrNext(() => testIfMatchBlockQuoteGrammer(startBlock, { editor, event }))
	);

	if (!markdownSupport()) {
		return next();
	}

	return;
};
export default onEnter;
