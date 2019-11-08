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
	const { editor } = props;
	return (
		<button
			contentEditable={false}
			style={{ position: 'absolute', left: '-45px', top: '0px' }}
			onClick={() => {
				console.log('自行处理click事件', editor.value.startBlock.type);
				if (editor.value.startBlock.type === 'list-item') {
					const startParent = editor.value.document.getClosestBlock(editor.value.startBlock.key, i => {
						return i.type === 'bulleted-list' || i.type === 'numbered-list';
					});
					if (startParent) {
						console.log(startParent.type, startParent.key);
						editor.setNodeByKey(startParent.key, {
							type: startParent.type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
						});
					}
				}
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
			const {
				isFocused,
				node: { type }
			} = props;
			const { isExpanded } = editor.value.selection; //选区未展开
			if (type !== 'list-item')
				// 这地方是防止list-item
				return (
					<WrapperBlock visible={isFocused && !isExpanded} wrapper={<Wrapper editor={editor} />}>
						{children}
					</WrapperBlock>
				);
			return <>{children}</>;
		}
	};
};
