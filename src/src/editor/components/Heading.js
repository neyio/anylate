import React from 'react';
import { componentClassName } from '../theme';

const Heading = React.forwardRef((props, ref) => {
	const { children, depth = 3, ...attributes } = props;

	switch (depth) {
		case 1:
			return (
				<h1 ref={ref} {...attributes} className={componentClassName.H1}>
					{children}
				</h1>
			);
		case 2:
			return (
				<h2 ref={ref} {...attributes} className={componentClassName.H2}>
					{children}
				</h2>
			);
		case 3:
			return (
				<h3 ref={ref} {...attributes} className={componentClassName.H3}>
					{children}
				</h3>
			);
		case 4:
			return (
				<h4 ref={ref} {...attributes} className={componentClassName.H4}>
					{children}
				</h4>
			);
		case 5:
			return (
				<h5 ref={ref} {...attributes} className={componentClassName.H5}>
					{children}
				</h5>
			);
		case 6:
			return (
				<h6 ref={ref} {...attributes} className={componentClassName.H6}>
					{children}
				</h6>
			);
		default:
			return (
				<p ref={ref} {...attributes} data-error="there is no such heading ">
					{children}
				</p>
			);
	}
});

export default Heading;

export const Heading1 = React.forwardRef((props, ref) => {
	return <Heading ref={ref} {...props} depth={1} />;
});

export const Heading2 = React.forwardRef((props, ref) => {
	return <Heading ref={ref} {...props} depth={2} />;
});
export const Heading3 = React.forwardRef((props, ref) => {
	return <Heading ref={ref} {...props} depth={3} />;
});
export const Heading4 = React.forwardRef((props, ref) => {
	return <Heading ref={ref} {...props} depth={4} />;
});
export const Heading5 = React.forwardRef((props, ref) => {
	return <Heading ref={ref} {...props} depth={5} />;
});
export const Heading6 = React.forwardRef((props, ref) => {
	return <Heading ref={ref} {...props} depth={6} />;
});
