import React, { useEffect } from 'react';

const WrapperBlock = ({ visible, wrapper, children }) => {
	useEffect(() => {
		console.log('init');
		return () => {
			console.log('clean');
		};
	}, []);
	return (
		<div style={{ position: 'relative' }}>
			{visible && wrapper}
			{children}
		</div>
	);
};

const DemoWrapper = props => {
	return (
		<button
			contentEditable={false}
			style={{ position: 'absolute', left: '-45px', top: '0px' }}
			onClick={() => {
				console.log('自行处理click事件', props.editor.value.startBlock.key);
			}}
		>
			ICON
		</button>
	);
};

/**
 * options需要传入一个Wrapper的组件，wrapper组件会被自动 inject 一个 {editor}的props以支持后续自定义操作
 * 例子见demoWrapper
 */
export default (options = {}) => {
	const { Wrapper = DemoWrapper } = options;
	return {
		renderBlock: (props, editor, next) => {
			const children = next();
			const { isFocused } = props;
			const { isExpanded } = editor.value.selection; //选区未展开
			return (
				<WrapperBlock visible={isFocused && !isExpanded} wrapper={<Wrapper editor={editor} />}>
					{children}
				</WrapperBlock>
			);
		}
	};
};
