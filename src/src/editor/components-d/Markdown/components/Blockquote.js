import React, { useState } from 'react';
import { cx, css } from 'emotion';
const icons = ['info', 'warning', 'danger', 'success'];
const BlockQuote = React.forwardRef((props, ref) => {
	const { attributes, children, node, editor } = props;
	const [type, setType] = useState(node.data.get('type') || 0);
	return (
		<blockquote
			{...attributes}
			className={cx(
				'blockquote-' + icons[type],
				css`
					padding-left: 3rem !important;
					position: relative;
				`
			)}
		>
			<span
				className={cx(
					'color-' + icons[type],
					css`
						position: absolute;
						left: 1em;
						top: 1em;
						cursor: pointer;
						&:hover {
							background: #eee;
						}
					`
				)}
				onClick={() => {
					const nextIndex = (type + 1) % 4;
					setType(nextIndex);
					editor.setNodeByKey(node.key, { data: { type: nextIndex } });
				}}
			>
				{icons[type]}
			</span>
			{children}
		</blockquote>
	);
});

export default BlockQuote;
