import React from 'react';
import Heading from './components/Heading';
import Hr from './components/Hr';
import Paragraph from './components/Paragraph';
import BlockQuote from './components/Blockquote';
import CheckListItem from './components/CheckListItem';
import onSpace from './core/onSpace';
import onBackspace from './core/onBackspace';
import onEnter from './core/onEnter';
import onInlineLexer from './core/onInlineLexer';
import { decorateNode, renderDecoration } from './core/renderDecoration';

// import { gfm as GFMInlineRuls } from './utils/inlineRules';
// eslint-disable-next-line
// Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

export default options => {
	return {
		schema: {
			blocks: {
				hr: {
					isVoid: true
				},
				'block-quote': {
					nodes: [{ match: { object: 'text' } }, { match: { object: 'paragraph' } }]
				},
				'check-list-item': {
					//'numbered-list' || 'bulleted-list'
					parent: [{ type: 'bulleted-list' }, { type: 'numbered-list' }],
					normalize: (editor, error) => {
						console.log(error);
					}
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
					return onInlineLexer({ event, editor }, next);
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
					return (
						<BlockQuote {...attributes} node={node} editor={editor}>
							{children}
						</BlockQuote>
					);
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
					return <CheckListItem {...props} editor={editor} />;
				default:
					return next();
			}
		}
		// decorateNode,
		// renderDecoration
	};
};
