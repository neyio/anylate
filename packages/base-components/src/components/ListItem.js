import React from 'react';
import { componentClassName } from '@anylate/themes';
import TodoItem from './TodoItem';
const ListItem = React.forwardRef(({ children, node, attributes, ...props }, ref) => {
	const checked = node.data.get('checked');
	if (checked !== undefined) {
		return (
			<TodoItem ref={ref} node={node} attributes={attributes} {...props}>
				{children}
			</TodoItem>
		);
	}
	return (
		<li ref={ref} {...attributes} className={componentClassName.ListItem}>
			{children}
		</li>
	);
});
export default ListItem;
