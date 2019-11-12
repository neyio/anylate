import React from 'react';
import { markDownToInlineLexer } from '../utils';
import { Mark } from 'slate';
import { List } from 'immutable';
export const renderDecoration = (props, editor, next) => {
	const { children, decoration, attributes } = props;

	switch (decoration.type) {
		case 'bold':
			return <strong {...attributes}>{children}</strong>;

		case 'code':
			return <code {...attributes}>{children}</code>;

		case 'italic':
			return <em {...attributes}>{children}</em>;

		case 'underlined':
			return <u {...attributes}>{children}</u>;

		case 'title': {
			return (
				<span
					{...attributes}
					style={{
						fontWeight: 'bold',
						fontSize: '20px',
						margin: '20px 0 10px 0',
						display: 'inline-block'
					}}
				>
					{children}
				</span>
			);
		}

		case 'punctuation': {
			return (
				<span {...attributes} style={{ opacity: 0.2 }}>
					{children}
				</span>
			);
		}

		case 'list': {
			return (
				<span
					{...attributes}
					style={{
						paddingLeft: '10px',
						lineHeight: '10px',
						fontSize: '20px'
					}}
				>
					{children}
				</span>
			);
		}

		case 'hr': {
			return (
				<span
					{...attributes}
					style={{
						borderBottom: '2px solid #000',
						display: 'block',
						opacity: 0.2
					}}
				>
					{children}
				</span>
			);
		}

		default: {
			return next();
		}
	}
};

function getTokenLength(token) {
	if (typeof token === 'string') {
		return token.length;
	} else if (typeof token.content === 'string') {
		return token.content.length;
	} else if (!token) {
		return 0;
	} else {
		return token.content.reduce((l, t) => l + getTokenLength(t), 0);
	}
}
// function dp(token){
// 	const { type, text } = token;
// 	let children = null;
// 	if (Array.isArray(text)) {
// 		children  = text.map(t => dp(t));
// 	}

// }
// `code` ** b ** __u__ ~~u~~

export const decorateNode = (node, editor, next) => {
	const others = next() || [];
	if (node.object !== 'block') return others;

	const string = node.text;
	const texts = Array.from(node.texts());
	// const { startText } = editor.value;
	const startText = node.getFirstText();
	let [objectText, pathList] = texts.shift();
	// const realPath = editor.value.document.getPath(objectText.key);
	// console.log('init', realPath);
	// const newnode = node.addMark(pathList, Mark.fromJSON({ type: 'bold' }));
	// console.log(newnode);
	// node.addMark(Mark.fromJSON({ type: 'bold' }));
	editor.setNodeByKey(startText.key, {
		...startText,
		marks: List([Mark.fromJSON({ type: 'bold' })])
	});
	const newnode = startText.addMark(Mark.fromJSON({ type: 'bold' }));
	editor.replaceNodeByKey(startText.key, newnode);
	// editor.toggleMark('bold');
	console.log(startText);
	const endstart = editor.value.document.getNode(startText.key);
	console.log('TCL: decorateNode -> endstart', endstart);

	return [];
	// const tokens = markDownToInlineLexer(string, []);
	// console.log('thisi is  ===>', tokens);

	// const texts = Array.from(node.texts());
	// let [objectText, pathList] = texts.shift();
	// if (objectText.key) {
	// 	console.group('decorateNode');
	// 	console.log('startEntry', objectText, pathList);
	// 	const dec = {
	// 		type: 'code',
	// 		anchor: {
	// 			key: objectText.key,
	// 			path: pathList,
	// 			offset: 0
	// 		},
	// 		focus: {
	// 			key: objectText.key,
	// 			path: pathList,
	// 			offset: 1 //字符串长度，左闭右开 ，最终位置length
	// 		}
	// 	};
	// 	console.groupEnd('decorateNode');
	// 	return [dec];
	// }

	// const decorations = [];
};
