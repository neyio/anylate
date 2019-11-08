import React from 'react';
import Heading from './Heading';
import Hr from './Hr';
import Paragraph from './Paragraph';
import CheckListItem from './CheckListItem';
import onSpace from './core/onSpace';
import { whenTrueOrNext, chain } from './utils/index';
import { testIfMatchListGrammer } from './utils/list';

/**
 * On backspace, if at the start of a non-paragraph, convert it back into a
 * paragraph node.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */

const onBackspace = (event, editor, next) => {
	const { value } = editor;
	const { selection } = value;
	if (selection.isExpanded) {
		return next();
	}
	if (selection.start.offset !== 0) {
		return next();
	}

	const { startBlock } = value;
	if (startBlock.type === 'paragraph') {
		return next();
	}

	if (value.isCollapsed && value.startBlock.type === 'check-list-item' && value.selection.startOffset === 0) {
		editor.setBlocks('paragraph');
		return;
	}

	event.preventDefault();

	editor.setBlocks('paragraph');
	if (startBlock.type === 'list-item') {
		editor.unwrapBlock('bulleted-list');
	}
};

/**
 * On return, if at the end of a node type that should not be extended,
 * create a new paragraph below it.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */
const onEnter = (event, editor, next) => {
	const { value } = editor;
	const { selection } = value;
	const { isExpanded } = selection;
	//排除选区
	if (isExpanded) {
		return next();
	}

	/**
	 * 获取当前激活的mark，样例
	 *	const inCodeMark = value.activeMarks.filter(i => i.type === 'code');
	 *  if (inCodeMark && inCodeMark.length) {
	 *	   editor.splitBlock().setMark('code');
	 *	   return next();
	 *  }
	 **/
	// 排除选区(废弃)
	// const {start, end} = selection;
	// if (start.offset === 0 && startBlock.text.length === 0) {
	// 	return onBackspace(event, editor, next);
	// }
	// if (end.offset !== startBlock.text.length) {
	// 	return next();
	// }
	const { startBlock } = value;
	if (startBlock.type === 'block-quote') {
		if (startBlock.text.endsWith('\n')) {
			editor
				.moveFocusBackward(2)
				.delete()
				.unwrapBlock('block-quote')
				.insertBlock('paragraph'); // TODO:这里会额外会增加一个段落，如果尾部为回车，此时通过向下光标移出选区，则按向上键位无法进入选区。
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

export default options => {
	return {
		schema: {
			blocks: {
				hr: {
					isVoid: true // 在真实dom中 hr容易被类似wrapperblock组件给包裹，导致选区无法被删除，加上isVoid保证不进入内部。 这个组件存在光标无法进入的问题，也就是点击组件，使得光标位置为组件本身，我们加了一个外边框表示该成员被选中了
				},
				'block-quote': {
					nodes: [{ match: { object: 'text' } }, { match: { object: 'paragraph' } }]
				}
			}
		},
		onKeyDown: (event, editor, next) => {
			switch (event.key) {
				case ' ':
					return onSpace(event, editor, next);
				case 'Backspace':
					return onBackspace(event, editor, next);
				case 'Enter':
					return onEnter(event, editor, next);
				default:
					return next();
			}
		},
		renderBlock: (props, editor, next) => {
			const { attributes, children, node } = props;
			switch (node.type) {
				case 'heading':
					console.log(node);
					return (
						<Heading {...attributes} depth={node.data.get('depth')}>
							{children}
						</Heading>
					);
				case 'block-quote':
					return <blockquote {...attributes}>{children}</blockquote>;
				case 'paragraph':
					// 通过添加一个placeholderVisible的状态，控制是否增加一个css样式（当文本没有内容[slate中是不存在的，通过attr的相关属性模拟]来显示placeholder）
					const { isFocused } = props;
					const { isExpanded } = editor.value.selection;
					return (
						<Paragraph {...attributes} placeholderVisible={isFocused && !isExpanded}>
							{children}
						</Paragraph>
					);
				case 'bulleted-list':
					return <ul {...attributes}>{children}</ul>;
				case 'numbered-list':
					return <ol {...attributes}>{children}</ol>;
				case 'list-item':
					return <li {...attributes}>{children}</li>;
				case 'hr':
					return <Hr {...attributes} isSelected={props.isSelected} />;
				case 'check-list-item':
					return <CheckListItem {...props} />;
				default:
					return next();
			}
		}
	};
};
