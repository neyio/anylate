import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import Button from './components/Button';
import Menu from './components/Menu';
import { ifHasLinks } from './link';

const HoverMenu = ({ editor, visible }) => {
	const ref = useRef(null);
	const root =
		window.document.getElementById('root') || window.document.getElementById('app') || window.document.body;
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
				color: #fff;
				border-radius: 4px;
				transition: opacity 0.75s;
			`}
		>
			<Button editor={editor} type="bold" icon="icon-editor-bold" />
			<Button editor={editor} type="italic" icon="icon-editor-italic" />
			<Button editor={editor} type="deleted" icon="icon-editor-strikethrough" />
			<Button editor={editor} type="underlined" icon="icon-editor-underline" />
			<Button editor={editor} type="code" icon="icon-code" />
			<Button editor={editor} type="clean" icon="icon-editor-clean" />
			<span className={css`margin-left: 15px;`}>|</span>
			{ifHasLinks(editor) ? (
				<Button editor={editor} type="unlink" icon="icon-editor-unlink" />
			) : (
				<Button editor={editor} type="link" icon="icon-editor-link" />
			)}
			{/* <Button editor={editor} type="code" icon=".icon-editor-undo" />
			<Button editor={editor} type="code" icon=".icon-editor-redo" /> */}
		</Menu>,
		root
	);
};

export default HoverMenu;
