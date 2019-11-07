import React from 'react';
import classnames from 'classnames';
const Paragraph = React.forwardRef(({ children, placeholderVisible, ...attributes }, ref) => {
	return (
		<div ref={ref} {...attributes} className={classnames(placeholderVisible ? 'paragraph-with-placeholder' : '')}>
			{children}
		</div>
	);
});
export default Paragraph;
