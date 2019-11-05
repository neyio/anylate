import React from 'react';
import classnames from 'classnames';
import styles from './title.less';
console.log(styles);
const Title = React.forwardRef((superProps, ref) => {
	const { children, className, ...props } = superProps;
	return (
		<h2 ref={ref} {...props} className={classnames(className, styles.title)}>
			{children}
		</h2>
	);
});

export default Title;
