import React from 'react';
import { cx, css } from 'emotion';
import Icon from './Icon';
import { wrapLink, unwrapLink, ifHasLinks } from '../link';

const Button = React.forwardRef(({ editor, type, className, icon }, ref) => {
	const { value } = editor;
	const active = value.activeMarks.some((mark) => mark.type === type);

	const onClickLink = (event, editor) => {
		event.preventDefault();

		const { value } = editor;
		const hasLinks = ifHasLinks(editor);

		if (hasLinks) {
			editor.command(unwrapLink);
		} else if (value.selection.isExpanded) {
			const href = window.prompt('请输入URL地址');

			if (href == null) {
				return;
			}

			editor.command(wrapLink, href);
		} else {
			const href = window.prompt('请输入URL地址');

			if (href == null) {
				return;
			}

			const text = window.prompt('请输入URL对应的文本');

			if (text == null) {
				return;
			}

			editor.insertText(text).moveFocusBackward(text.length).command(wrapLink, href);
		}
	};
	return (
		<span
			ref={ref}
			className={cx(
				className,
				css`
					padding: 2px 5px;
					cursor: pointer;
					background: ${active ? '#eee' : 'transparent'};
					color: ${active ? '#333' : '#eee'};
				`
			)}
			onMouseDown={(event) => {
				event.preventDefault();
				switch (type) {
					case 'clean':
						return [ 'bold', 'italic', 'deleted', 'underlined', 'code', 'inserted' ].forEach((mark) => {
							editor.removeMark(mark);
						});
					case 'link':
						onClickLink(event, editor);
						break;
					case 'unlink':
						onClickLink(event, editor);
						break;
					default:
						editor.toggleMark(type);
				}
			}}
		>
			<Icon icon={icon} />
		</span>
	);
});

export default Button;
