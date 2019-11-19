import React from 'react';
import { cx, css } from 'emotion';

const Icon = React.forwardRef(({ icon, ...props }, ref) => {
	console.log(icon);
	return (
		<span
			{...props}
			ref={ref}
			className={cx(
				'iconfont',
				icon,
				css`
					font-size: 18px;
					font-weight: bold;
					vertical-align: text-bottom;
				`
			)}
		/>
	);
});
export default Icon;
