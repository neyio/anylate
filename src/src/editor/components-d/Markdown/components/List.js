import React from 'react';

const List = React.forwardRef((props, ref) => {
	const { children, ...attributes } = props;
	return (
		<ul ref={ref} {...attributes}>
			{children}
		</ul>
	);
});

export default List;
