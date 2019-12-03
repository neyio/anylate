import React from 'react';

import onPaste from './onPaste';
import HoverMenu from './HoverMenu';
const Editor = ({ children, editor, readOnly }) => {
	return (
		<React.Fragment>
			{children}
			{!readOnly && <HoverMenu editor={editor} />}
		</React.Fragment>
	);
};

export default () => {
	return {
		renderEditor: (props, editor, next) => {
			const children = next();
			return (
				<Editor editor={editor} readOnly={props.readOnly}>
					{children}
				</Editor>
			);
		},
		onPaste
	};
};
