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

const DemoWrapper2 = (props) => {
	return (
		<div contentEditable={false} style={{ position: 'absolute', left: '-2rem', top: '2px', fontSize: '1em' }}>
			<span className="iconfont icon-row-add" />
		</div>
	);
};

/**
 * options需要传入一个Wrapper的组件，wrapper组件会被自动 inject 一个 {editor}的props以支持后续自定义操作
 * 例子见demoWrapper
 */
export default (options = {}) => {
	const { Wrapper = DemoWrapper2 } = options;
	return {
		renderBlock: (props, editor, next) => {
			const children = next();
			const { isFocused, node } = props;
			const { isExpanded } = editor.value.selection; //选区未展开
			const { document } = editor.value;
			const { type } = node;
			// console.log('includes', document.nodes.includes(node)); 判断是否为直接根相关枝干节点
			if (type !== 'list-item' && document.nodes.includes(node))
				return (
					<WrapperBlock visible={isFocused && !isExpanded} wrapper={<Wrapper editor={editor} />}>
						{children}
					</WrapperBlock>
				);
			return <React.Fragment>{children}</React.Fragment>;
		}
	};
};
