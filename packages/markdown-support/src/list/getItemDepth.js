function getItemDepth(value) {
	const { document, startBlock } = value;
	let i = 0;
	let currentNode = startBlock;
	while (document !== currentNode) {
		const parentNode = document.getClosest(currentNode.key, (i) => i.type === 'list-item');
		currentNode = parentNode;
		if (!currentNode) break;
		console.log('TCL: circel -> currentNode', currentNode);
		i++;
	}
	return i;
}

export default getItemDepth;
