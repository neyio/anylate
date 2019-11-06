import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { Button, Icon, Menu } from './components';

const MarkButton = ({ editor, type, icon }) => {
	const { value } = editor;
	const isActive = value.activeMarks.some(mark => mark.type === type);
	return (
		<Button
			reversed
			active={isActive}
			onMouseDown={event => {
				event.preventDefault();
				editor.toggleMark(type);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

const HoverMenu = ({ editor, visible }) => {
	const ref = useRef(null);
	const root = window.document.getElementById('root') || window.document.getElementById('app');
	const menu = ref.current;
	if (menu) {
		const { value } = editor;
		const { fragment, selection } = value;
		if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
			menu.removeAttribute('style');
		} else {
			const native = window.getSelection();
			const range = native.getRangeAt(0);
			const rect = range.getBoundingClientRect();
			menu.style.opacity = 1;
			menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
			menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
		}
	}
	return ReactDOM.createPortal(
		<Menu
			ref={ref}
			className={css`
				padding: 8px 7px 6px;
				position: absolute;
				z-index: 1;
				top: -10000px;
				left: -10000px;
				margin-top: -6px;
				opacity: 0;
				background-color: #222;
				border-radius: 4px;
				transition: opacity 0.75s;
			`}
		>
			<MarkButton editor={editor} type="bold" icon="format_bold" />
			<MarkButton editor={editor} type="italic" icon="format_italic" />
			<MarkButton editor={editor} type="underlined" icon="format_underlined" />
			<MarkButton editor={editor} type="code" icon="code" />
		</Menu>,
		root
	);
};

const Editor = ({ children, editor }) => {
	return (
		<React.Fragment>
			{children}
			<HoverMenu editor={editor} />
		</React.Fragment>
	);
};

export default options => ({
	renderEditor: (props, editor, next) => {
		const children = next();
		return <Editor editor={editor}>{children}</Editor>;
	},
	renderMark: (props, editor, next) => {
		const { children, mark, attributes } = props;
		switch (mark.type) {
			case 'bold':
				return <strong {...attributes}>{children}</strong>;
			case 'code':
				return <code {...attributes}>{children}</code>;
			case 'italic':
				return <em {...attributes}>{children}</em>;
			case 'underlined':
				return <u {...attributes}>{children}</u>;
			default:
				return next();
		}
	}
});
