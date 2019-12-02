import React from 'react';

import { cx } from 'emotion';
import { componentClassName } from '../theme';
const Paragraph = React.forwardRef(({ children, placeholderVisible, ...attributes }, ref) => {
	return (
		<div
			ref={ref}
			{...attributes}
			className={cx(placeholderVisible ? componentClassName.ParagraphPlaceHolder : componentClassName.Paragraph)}
		>
			{children}
		</div>
	);
});
export default Paragraph;
