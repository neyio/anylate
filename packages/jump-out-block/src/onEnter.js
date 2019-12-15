const onEnter = (options = []) => (event, editor, next) => {
	const mixinOptions = [
		{
			blockType: 'list-item',
			exitBlockType: 'paragraph',
			onEmptyBlock: true,
			unwrap: true
		},
		{
			blockType: /heading/,
			exitBlockType: 'paragraph'
		},
		{
			blockType: 'block-quote',
			exitBlockType: 'paragraph',
			onEmptyBlock: true
		},
		...options
	];
	const { startBlock } = editor.value;
	const blockType = startBlock.type;
	
	const isBlockEmpty = startBlock.text === '' ? true : false;
	[ 'bold', 'italic', 'deleted', 'underlined', 'code', 'inserted' ].forEach((mark) => {
		editor.removeMark(mark);
	});

	return (
		mixinOptions.some((option) => {
			const regexp = RegExp(option.blockType);
			if (regexp.test(blockType) || option.blockType === blockType) {
				console.log('REGTEST:PASSED', blockType);
				if (option.onEmptyBlock) {
					if (isBlockEmpty) {
						if (option.unwrap) {
							const parentType = editor.value.document.getParent(startBlock.key).type;
							return editor.setBlocks(option.exitBlockType).unwrapBlock(parentType);
						} else {
							return editor.setBlocks(option.exitBlockType);
						}
					} else {
						console.log('is not empty , and jumpout');
						//Special support for block-quote, to make 'enter' supported in block-quote ,otherwise it will insert a new block-quote block;
						//reason : some editor is not support \n in block-quote, but anylate maybe support it for experience.
						return (
							onEnterInblockQuote(startBlock, { editor, event }) || editor.setBlocks(option.exitBlockType)
						);
					}
				} else {
					return editor.insertBlock(option.exitBlockType);
				}
			}
			return false;
		}) || next()
	);
};

function onEnterInblockQuote(startBlock, { editor, event }) {
	if (startBlock.type !== 'block-quote') {
		return false;
	}
	if (startBlock.text.endsWith('\n')) {
		editor.moveFocusBackward(1).delete().unwrapBlock('block-quote').insertBlock('paragraph');
		return true;
	} else if (startBlock.text === '') {
		editor.unwrapBlock('block-quote').setBlocks('paragraph');
	} else {
		event.preventDefault();
		editor.insertText('\n');
		return true;
	}
}
export default onEnter;
