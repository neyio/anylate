import marked from 'marked';
import React from 'react';
import Heading from './Heading';
import Hr from './Hr';
// 考虑到webwork的异步特性，为了不产生对编辑器插件产生结构性破坏，暂时注释
// import workerMaster from './WorkerMaster';
const markDownToLexer = md => {
	// if (Worker) {
	// return (async (md, opts) => await workerMaster(md, { ...opts }))(md, options);
	// }
	return marked.lexer(md);
};
const onSpace = (event, editor, next) => {
	const { value } = editor;
	const { selection } = value;
	if (selection.isExpanded) {
		return next();
	}
	const { startBlock } = value;
	const { text } = startBlock;
	if (startBlock.type === 'heading') return next();
	const textWithSpace = text.replace(/^(\s{0,3}#+)/, '$1 ');
	const tokens = markDownToLexer(textWithSpace);
	console.log('markdownLexer', tokens, 'textWithSpace', textWithSpace);

	for (let token of tokens) {
		const { type } = token;
		//不对列表进行处理
		if (type === 'list-item' && startBlock.type === 'list-item') {
			return next();
		}

		//类型具有： "code" | "hr" | "html" | "table" | "text" | "space" | "heading" | "blockquote_start" | "blockquote_end" | "list_start" | "loose_item_start" | "list_item_start" | "list_item_end" | "list_end" | "paragraph"

		switch (type) {
			case 'heading': {
				event.preventDefault();
				editor
					.setBlocks(type)
					.setNodeByKey(startBlock.key, { data: { depth: token.depth } })
					.focus();
				editor.moveFocusToStartOfNode(startBlock).delete();
				return;
			}
			case 'hr': {
				event.preventDefault();
				editor
					.moveFocusToStartOfNode(startBlock)
					.delete()
					.setBlocks('hr')
					.insertBlock('paragraph')
					.focus();
				return;
			}
			default:
				return next();
		}
		// if (type === 'list-item') {
		// 	editor.wrapBlock('bulleted-list');
		// }
		// editor.moveFocusToStartOfNode(startBlock).delete();
	}
	return next();
};
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
	if (selection.isExpanded) return next();
	if (selection.start.offset !== 0) return next();

	const { startBlock } = value;
	if (startBlock.type === 'paragraph') return next();

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
	const { start, end, isExpanded } = selection;
	if (isExpanded) return next();

	const { startBlock } = value;
	if (start.offset === 0 && startBlock.text.length === 0) return onBackspace(event, editor, next);
	if (end.offset !== startBlock.text.length) return next();

	if (startBlock.type !== 'heading' && startBlock.type !== 'block-quote') {
		return next();
	}

	event.preventDefault();
	editor.splitBlock().setBlocks('paragraph');
};
export default options => {
	return {
		schema: {
			blocks: {
				hr: {
					isVoid: true
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
				case 'bulleted-list':
					return <ul {...attributes}>{children}</ul>;
				case 'list-item':
					return <li {...attributes}>{children}</li>;
				case 'hr':
					return <Hr {...attributes} />;
				default:
					return next();
			}
		}
	};
};
