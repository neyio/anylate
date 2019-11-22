import React, { useEffect, useRef, useState } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import List from './components/List';
const iconItems = [
	{ text: '一级标题', icon: 'icon-formatheader1', block: 'heading1', shortCut: '⌘+1' },
	{ text: '二级标题', icon: 'icon-formatheader2', block: 'heading2', shortCut: '⌘+2' },
	{ text: '三级标题', icon: 'icon-formatheader3', block: 'heading3', shortCut: '⌘+3' },
	{ text: '四级标题', icon: 'icon-formatheader4', block: 'heading4', shortCut: '⌘+4' },
	{ text: '五级标题', icon: 'icon-formatheader5', block: 'heading5', shortCut: '⌘+5' },
	{ text: '六级标题', icon: 'icon-formatheader6', block: 'heading6', shortCut: '⌘+6' },
	{ text: '段落', icon: 'icon-paragraph', block: 'paragraph', shortCut: '⌘+p' },
	{ text: '引用段落', icon: 'icon-double-quotes-l', block: 'block-quote', shortCut: '⌘+>' },
	{ text: '有序列表', icon: 'icon-editor-list-numbers', block: 'block-quote', shortCut: '⌘+>' },
	{ text: '无序列表', icon: 'icon-editor-list-bulleted', block: 'block-quote', shortCut: '⌘+>' },
	{ text: '任务列表', icon: 'icon--Todo-List', block: 'todo-list', shortCut: '⌘+>' },
	{ text: '代码块', icon: 'icon-code', block: 'code', shortCut: '⌘+⌥+c' }
];
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

const DemoWrapper2 = ({ editor, node }) => {
	const [ visible, setVisible ] = useState(false);
	const triggerRef = useRef(null);
	const handleClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};
	return (
		<div
			contentEditable={false}
			style={{
				position: 'absolute',
				left: '-40px',
				top: '-7px',
				fontSize: '16px',
				padding: '4px',
				cursor: 'pointer'
			}}
			onClick={handleClick}
			ref={triggerRef}
		>
			<Tooltip
				visible={visible}
				// animation="zoom"
				placement="rightTop"
				destroyTooltipOnHide={true}
				onVisibleChange={(v) => setVisible(v)}
				trigger="click"
				overlay={<List editor={editor} node={node} hiddenMenu={() => setVisible(false)} items={iconItems} />}
			>
				<span className="iconfont icon-row-add" style={{ fontSize: '1.2rem', color: '#666' }} />
			</Tooltip>
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
			const { node, isSelected } = props; // isFocused,
			const { isExpanded } = editor.value.selection; //选区未展开
			const { document } = editor.value;
			const { type } = node;
			if (type !== 'list-item' && document.nodes.includes(node))
				return (
					<WrapperBlock visible={isSelected && !isExpanded} wrapper={<Wrapper node={node} editor={editor} />}>
						{children}
					</WrapperBlock>
				);
			return <React.Fragment>{children}</React.Fragment>;
		}
	};
};
