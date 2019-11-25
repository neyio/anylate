import React, { useCallback } from 'react';
import { useDrag } from 'react-dnd';
import draghandler from './draghandler.svg';
import { componentClassName } from '../../theme';

// const style = {
// 	padding: '0.5rem 1rem 0.5rem 1.2rem',
// 	backgroundColor: 'white'
// };
const Card = ({ id, children, dispatch, index, nodeKey, editor, state }) => {
	const { hoverKey, dragKey } = state;
	const moveCard = useCallback(
		(dragKey, hoverKey) => {
			const parentKey = editor.value.document.key;
			if (dragKey === hoverKey) return;
			const hoverIndex = editor.value.document.nodes.findIndex((i) => i.key === hoverKey + ''); //hoverKey > dragKey ? hoverKey - 1 : hoverKey
			return editor.moveNodeByKey(dragKey, parentKey, hoverIndex);
		},
		[ editor ]
	);
	const [ { isDragging }, drag, preview ] = useDrag({
		item: { type: 'card', id, index, nodeKey },
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		}),
		options: {
			dropEffect: 'move'
		},
		begin: (item) => {
			dispatch({
				type: 'setDragKey',
				payload: nodeKey
			});
		},
		end: (dropResult, monitor) => {
			if (dropResult) {
				const { nodeKey: dragKey } = dropResult;
				moveCard(dragKey, hoverKey);
				setTimeout(() => {
					dispatch({
						type: 'clean'
					});
				}, 55);
			}
		}
	});
	const opacity = isDragging ? 0 : 1;
	const borderExtra = (drag, hover) => {
		if (hover !== nodeKey) {
			return {};
		}
		const dragIndex = editor.value.document.nodes.findIndex((i) => i.key === drag + '');
		const hoverIndex = editor.value.document.nodes.findIndex((i) => i.key === hover + '');
		if (dragIndex > hoverIndex) {
			return { borderTopColor: 'green' };
		} else {
			return { borderBottomColor: 'green' };
		}
	};
	return (
		<div
			ref={preview}
			style={{
				opacity,
				border: hoverKey === nodeKey ? '2px solid var(--theme-color,#eee)' : '2px solid transparent',
				...borderExtra(dragKey, hoverKey)
			}}
			className={componentClassName.DragContainer}
		>
			<img
				className={componentClassName.DragHandler}
				contentEditable={false}
				ref={drag}
				src={draghandler}
				alt="拖拽此处以排序"
			/>
			{children}
		</div>
	);
};
export default Card;
