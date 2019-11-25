import React from 'react';

export default function VideoUrlInput(props) {
	const [ val, setVal ] = React.useState(props.defaultValue);

	const onChange = React.useCallback(
		(e) => {
			setVal(e.target.value);
			props.onChange(e.target.value);
		},
		[ props ]
	);

	return <input value={val} onChange={onChange} onClick={props.onClick} style={props.style} />;
}
