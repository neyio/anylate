import * as React from 'react';
// import { Editor } from 'slate';
// import Code from "./components/Code";
// import BlockToolbar from './components/Toolbar/BlockToolbar';
import Hr from './components/Hr';

import Image from './components/Image';
import Link from './components/Link';
// import Hashtag from "./components-d/Hashtag";
// import Table from "./plugins/MarkDown/components/Table";
// import Cell from "./plugins/MarkDown/components/Table/Cell";
// import Row from "./plugins/MarkDown/components/Table/Row";
import ListItem from './components/ListItem';
import TodoList from './components/TodoList';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from './components/Heading';
import Paragraph from './components/Paragraph';

export default function renderBlock(props, editor, next) {
	const { attributes } = props;

	const hidden = props.node.data.get('hidden');
	if (hidden) attributes.style = { display: 'none' };

	switch (props.node.type) {
		case 'paragraph':
			const { isFocused } = props;
			const { isExpanded } = editor.value.selection;
			// 通过添加一个placeholderVisible的状态，控制是否增加一个css样式（当文本没有内容[slate中是不存在的，通过attr的相关属性模拟]来显示placeholder）
			return (
				<Paragraph {...attributes} placeholderVisible={isFocused && !isExpanded}>
					{props.children}
				</Paragraph>
			);
		// case 'block-toolbar':
		// 	return <BlockToolbar {...props} />;
		case 'block-quote':
			return <blockquote {...attributes}>{props.children}</blockquote>;
		case 'bulleted-list':
			return <ul {...attributes}>{props.children}</ul>;
		case 'ordered-list':
			return <ol {...attributes}>{props.children}</ol>;
		case 'todo-list':
			return <TodoList {...attributes}>{props.children}</TodoList>;
		// case "table":
		//   return <Table {...props}>{props.children}</Table>;
		// case "table-row":
		//   return <Row {...props} />;
		// case "table-cell":
		//   return <Cell {...props} />;
		case 'list-item':
			return <ListItem {...props} />;
		case 'horizontal-rule':
			return <Hr {...attributes} isSelected={props.isSelected} />;
		// case "code":
		//   return <Code {...props} />;
		// case "code-line":
		//   return <pre {...attributes}>{props.children}</pre>;
		case 'image':
			return <Image {...props} />;
		case 'link':
			return <Link {...props} />;
		// case "hashtag":
		//   return <Hashtag {...props} />;
		case 'heading1':
			return <Heading1 {...attributes}>{props.children}</Heading1>;
		case 'heading2':
			return <Heading2 {...attributes}>{props.children}</Heading2>;
		case 'heading3':
			return <Heading3 {...attributes}>{props.children}</Heading3>;
		case 'heading4':
			return <Heading4 {...attributes}>{props.children}</Heading4>;
		case 'heading5':
			return <Heading5 {...attributes}>{props.children}</Heading5>;
		case 'heading6':
			return <Heading6 {...attributes}>{props.children}</Heading6>;
		default:
			return next();
	}
}
