import React from 'react';
import { componentClassName } from '@anylate/themes';
const TodoList = React.forwardRef((props, ref) => {
	return (
		<ul ref={ref} className={componentClassName.ToDoList}>
			{props.children}
		</ul>
	);
});

export default TodoList;
