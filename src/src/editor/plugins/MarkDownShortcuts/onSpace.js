import { Block } from 'slate';
import { getType, inlineShortcuts } from './utils';

export default function onSpace(event, editor, next) {
	const { value } = editor;
	const { selection, startBlock } = value;

	//当选区非空，直接放弃操作
	if (selection.isExpanded) {
		return next();
	}

	const chars = startBlock.text.slice(0, selection.start.offset).trim(); //光标位置的偏移量, 去除 两侧的空格
	console.log('TCL: chars', chars);

	const type = getType(chars); //计算类型
	const blockType = startBlock.type;

	console.log(startBlock);
	//TODO:table 中是否支持md？
	//判断类型是否符合处理类型的markdown组件
	if (type) {
		//如果类型匹配为heading则址
		console.log(chars, type);
		const regs = [
			{ reg: /^\s*\d\./, type: 'ordered' },
			{ reg: /^\s*-\s*\[ {1}\]/, type: 'undo' },
			{ reg: /^\s*-\s*\[x{1}\]/, type: 'finished' },
			{ reg: /^\* +/, type: 'bulleted' }
		];
		if (type.match(/heading/) || type.match('paragraph')) {
			// 防止空格
			event.preventDefault();
		}

		if (startBlock.type.match(/heading/) && !type.match(/heading/)) {
			return next();
		}
		const isCurrentBlockListItem = blockType === 'list-item';
		// needWrappedUp
		if (type === 'list-item') {
			console.group('list-item-wrap');
			const subType = regs.find((item) => item.reg.test(startBlock.text + ' '));
			console.log('TCL: subType', subType);
			if (!subType) {
				console.error('error subType');
			}
			const wrapType =
				subType.type === 'ordered'
					? 'ordered-list'
					: subType.type === 'bulleted' ? 'bulleted-list' : 'todo-list';
			const data = wrapType === 'todo-list' ? { checked: subType.type === 'finished' ? true : false } : {};
			if (isCurrentBlockListItem) {
				const ListItem = Block.create({
					type: 'list-item',
					object: 'block',
					nodes: [
						{
							type: wrapType,
							object: 'block',
							nodes: [
								{
									object: 'block',
									type: 'list-item',
									data: data,
									nodes: [
										{
											object: 'text',
											text: ''
										}
									]
								}
							]
						}
					]
				});
				editor.removeNodeByKey(startBlock.key);
				editor.insertBlock(ListItem);
			} else {
				const wrapType = subType.type === 'ordered' ? 'ordered-list' : 'bulleted-list';
				editor.wrapBlock(wrapType);
				console.log('isCurrentBlockListItem', false);
				editor.moveFocusToStartOfNode(startBlock).delete().setBlocks({ type: 'list-item', data });
			}
			console.groupEnd('list-item-wrap');
			return;
		}
		return editor.moveFocusToStartOfNode(startBlock).delete().setBlocks(type);
	}

	console.log('inlineProcess');

	editor.withoutNormalizing((editor) => {
		const list = startBlock.getTexts();
		list.forEach((firstText) => {
			for (const key of inlineShortcuts) {
				let { mark, shortcut, reg, type, wrap } = key;
				const text = firstText.text;
				let inlineTags = [];
				let result = reg.exec(text);
				if (result) {
					inlineTags = [ result.index, result.index + result[0].length ];
					const [ start, end ] = inlineTags;
					if (type === 'block' && wrap === 'image') {
						event.preventDefault();
						const [ , label, uri ] = /\[(\S*)\]\((\S+)\)/.exec(result[0]);
						editor
							.removeTextByKey(firstText.key, start, result[0].length)
							.splitBlock()
							.setBlocks({
								type: 'image',
								data: { src: uri, alt: label }
							})
							.moveForward(1);
						// .moveToEndOf()
						// .moveToEnd();
						break;
					}
					if (type === 'inline' && wrap === 'link') {
						event.preventDefault();
						const [ , label, uri ] = /\[(\S+)\]\((\S+)\)/.exec(result[0]);
						editor
							.removeTextByKey(firstText.key, end - uri.length - 3, uri.length + 3)
							.removeTextByKey(firstText.key, start, 1)
							.moveStartTo(firstText.key, start)
							.moveEndTo(firstText.key, start + label.length)
							.wrapInline({
								type: 'link',
								data: { href: uri }
							})
							.moveToEnd();
						break;
					}
					editor
						.removeTextByKey(firstText.key, end - shortcut.length, shortcut.length)
						.removeTextByKey(firstText.key, start, shortcut.length)
						.moveAnchorTo(start, end - shortcut.length)
						.addMark(mark)
						.moveToEnd()
						.removeMark(mark);
					break;
				}
			}
		});
	});
	return next();
}
