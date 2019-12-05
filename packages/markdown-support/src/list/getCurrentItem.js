function getCurrentItem(value, block) {
	const { document, starBlock } = value;
	if (((block && block.type) || (starBlock && starBlock.type)) === 'list-item') return block || starBlock;
	const parent = document.getClosest(
		(block && block.key) || (starBlock && starBlock.key),
		(i) => i.type === 'list-item'
	);
	return parent || false;
}

export default getCurrentItem;
