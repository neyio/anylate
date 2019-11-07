import React from 'react';
// 因为组件内部不存在文本，需要在schema中增加 hr为 isVoid为true，以防止该节点在backspace时无法删除。
const Hr = React.forwardRef((props, ref) => {
	const { attributes = {} } = props;
	return <hr ref={ref} {...attributes} />;
});

export default Hr;
