import React from 'react';

const Hr = React.forwardRef((props, ref) => {
	const { attributes = {} } = props;
	return <hr ref={ref} {...attributes} />;
});

export default Hr;
