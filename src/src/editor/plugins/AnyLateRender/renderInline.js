import React from 'react';

export default function renderInline(props, editor, next) {
	const { attributes, children, node } = props;

	switch (node.type) {
		case 'link': {
			const { data } = node;
			const href = data.get('href');
			return (
				<a {...attributes} href={href}>
					{children}
				</a>
			);
		}

		default: {
			return next();
		}
	}
}
