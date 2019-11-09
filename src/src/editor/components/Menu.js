import React, { useState } from 'react';
// import { Menu, Dropdown, Button, Icon, message } from 'antd';
import { Popover, Icon } from 'antd';

const FullMenu = React.forwardRef((props, ref) => {
	const menu = <div>1 21 212</div>;
	const [clicked, setClicked] = useState(false);
	const handleClickChange = () => {
		setClicked(!clicked);
	};
	return (
		<Popover placement="bottomLeft" title={'+'} content={menu} trigger="click" onVisibleChange={handleClickChange}>
			<Icon
				theme="twoTone"
				twoToneColor="#42b983cc"
				type={clicked ? 'up-circle' : 'down-circle'}
				style={{ fontSize: '1.4rem', color: '#333' }}
			></Icon>
		</Popover>
	);
});

export default FullMenu;
