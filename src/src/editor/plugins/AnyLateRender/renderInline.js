import React from 'react';
import { componentClassName } from '../../theme';

export default function renderInline(props, editor, next) {
	const { attributes, children, node } = props;

	switch (node.type) {
		case 'link': {
			const { data } = node;
			const href = data.get('href');
			return (
				<a className={componentClassName.Link} {...attributes} href={href}>
					{children}
				</a>
			);
		}
		default: {
			return next();
		}
	}
}
