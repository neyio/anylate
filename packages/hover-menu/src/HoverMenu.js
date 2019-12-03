import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import Tooltip from 'rc-tooltip';
import Button from './components/Button';

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
		<ul
			ref={ref}
			className={css`
				padding: 6px 8px;
				position: absolute;
				z-index: 1;
				top: -10000px;
				left: -10000px;
				margin-top: -6px;
				display: flex;
				flex-direction: row;
				align-items: center;
				min-width: 350px;
				justify-content: space-around;
				opacity: 0;
				background-color: #222;
				color: #fff;
				border-radius: 4px;
				transition: opacity 0.75s;
				& > li {
					display: flex;
					height: 35px;
					width: 35px;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}
			`}
		>
			<Tooltip placement="bottom" trigger={[ 'hover' ]} overlay={<span>粗体</span>} overlayClassName={'hello'}>
				<li>
					<Button editor={editor} type="bold" icon="icon-editor-bold" />
				</li>
			</Tooltip>
			<Tooltip placement="bottom" trigger={[ 'hover' ]} overlay={<span>斜体</span>}>
				<li>
					<Button editor={editor} type="italic" icon="icon-editor-italic" />
				</li>
			</Tooltip>
			<Tooltip placement="bottom" trigger={[ 'hover' ]} overlay={<span>删除线</span>}>
				<li>
					<Button editor={editor} type="deleted" icon="icon-editor-strikethrough" />
				</li>
			</Tooltip>
			<Tooltip placement="bottom" trigger={[ 'hover' ]} overlay={<span>下划线</span>}>
				<li>
					<Button editor={editor} type="underlined" icon="icon-editor-underline" />
				</li>
			</Tooltip>
			<Tooltip placement="bottom" trigger={[ 'hover' ]} overlay={<span>行内代码</span>}>
				<li>
					<Button editor={editor} type="code" icon="icon-code" />
				</li>
			</Tooltip>
			<li>
				<span
					className={css`
						line-height: 35px;
						flex: 1;
						height: 35px;
						width: 35px;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
					`}
				>
					|
				</span>
			</li>
			{ifHasLinks(editor) ? (
				<Tooltip placement="bottom" trigger={[ 'hover' ]} overlay={<span>取消链接</span>}>
					<li>
						<Button editor={editor} type="unlink" icon="icon-editor-unlink" />
					</li>
				</Tooltip>
			) : (
				<Tooltip placement="bottom" trigger={[ 'hover' ]} overlay={<span>超链接</span>}>
					<li>
						<Button editor={editor} type="link" icon="icon-editor-link" />
					</li>
				</Tooltip>
			)}
			<Tooltip placement="bottom" trigger={[ 'hover' ]} overlay={<span>清除格式</span>}>
				<li>
					<Button editor={editor} type="clean" icon="icon-editor-clean" />
				</li>
			</Tooltip>
		</ul>,
		root
	);
};

export default HoverMenu;
