import React from 'react';
import Heading from './components/Heading';
import Hr from './components/Hr';
import Paragraph from './components/Paragraph';

import CheckListItem from './components/CheckListItem';
import onSpace from './core/onSpace';
import onBackspace from './core/onBackspace';
import onEnter from './core/onEnter';

export default options => {
	return {
		schema: {
			blocks: {
				hr: {
					isVoid: true
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
					return (
						<Heading {...attributes} depth={node.data.get('depth')}>
							{children}
						</Heading>
					);
				case 'block-quote':
					return <blockquote {...attributes}>{children}</blockquote>;
				case 'paragraph':
					const { isFocused } = props;
					const { isExpanded } = editor.value.selection;
					// 通过添加一个placeholderVisible的状态，控制是否增加一个css样式（当文本没有内容[slate中是不存在的，通过attr的相关属性模拟]来显示placeholder）
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
