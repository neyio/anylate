export const inlineShortcuts = [
	{ mark: "bold", shortcut: "**", reg: /\*\*\S+\*\*/ },
	{ mark: "bold", shortcut: "__", reg: /__\S+__/ },
	{ mark: "italic", shortcut: "*", reg: /\*\S+\*/ },
	{ mark: "italic", shortcut: "_", reg: /_\S+_/ },
	{ mark: "code", shortcut: "`", reg: /`\S*`/ },
	{ mark: "inserted", shortcut: "++", reg: /\+\+\S+\+\+/ },
	{ mark: "deleted", shortcut: "~~", reg: /~~\S+~~/ },
	{ wrap: "image", type: "block", reg: /!\[\S*]\(\S*\)/ },
	{ wrap: "link", type: "inline", reg: /\[\S+\]\(\S+\)/ }
];

export const getType = chars => {
	switch (chars) {
		// case '*':
		// case '+':
		// case '1.':
		// case '- [ ]':
		// case '- [x]':
		// 	return 'list-item';
		case ">":
			return "block-quote";
		case "#":
			return "heading1";
		case "##":
			return "heading2";
		case "###":
			return "heading3";
		case "####":
			return "heading4";
		case "#####":
			return "heading5";
		case "######":
			return "heading6";
		default:
			return null;
	}
};

export const addMark = (startBlock, editor) => {
	for (const key of inlineShortcuts) {
		let { mark, shortcut, reg } = key;
		let inlineTags = [];
		let result = null;

		while ((result = reg.exec(startBlock.text)) !== null) {
			console.log(inlineTags);
			inlineTags = [result.index, result.index + result[0].length];
		}

		const firstText = startBlock.getFirstText();
		if (inlineTags.length > 1) {
			const [start, end] = inlineTags;
			return editor
				.removeTextByKey(firstText.key, end - shortcut.length, shortcut.length)
				.removeTextByKey(firstText.key, start, shortcut.length)
				.moveAnchorTo(start, end)
				.addMark(mark)
				.moveToEnd()
				.removeMark(mark);
		}
	}
	return false;
};

export const isModKey = event => {
	const inIOS =
		typeof window !== "undefined" &&
		/Mac|iPad|iPod|iPhone/.test(window.navigator.platform);
	return inIOS ? event.metaKey : event.ctrlKey;
};
