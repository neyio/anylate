import React from 'react';
import { cx, css } from 'emotion';
// 因为组件内部不存在文本，需要在schema中增加 hr为 isVoid为true，以防止该节点在backspace时无法删除。
const Hr = React.forwardRef((props, ref) => {
	const { isSelected = false, ...attributes } = props;
	return (
		<div
			ref={ref}
			{...attributes}
			className={cx(
				'hr',
				css`
					width: 100%;
					height: 2px;
					margin: 1rem 0;
					background: #eee;
					cursor: pointer;
					border-color: ${isSelected ? 'var(--theme-color, #42b983)' : 'transparent'};
					border-style: solid;
					border-width: 1px;
				`
			)}
		/>
	);
});

export default Hr;
