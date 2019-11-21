import React from 'react';
import { useDrag } from 'react-dnd';
import { cx, css } from 'emotion';
import draghandler from './draghandler.svg';
const style = {
	border: '1px dashed gray',
	padding: '0rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	width: '20rem'
};

const BoxWithHandle = ({ hover, children }) => {
	const [ { opacity }, drag, preview ] = useDrag({
		item: { type: 'box' },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.2 : 1
		})
	});
	return (
		<div
			ref={preview}
			className={cx(
				'drag-container',
				css`
					.img-handler {
						display: none;
					}
					&:hover .img-handler {
						display: block;
						position: abosulte;
						left: -1rem;
					}
				`
			)}
			style={{ ...style, opacity, border: hover ? '2px solid var(--theme-color,#eee)' : '2px solid transparent' }}
		>
			<img
				className="img-handler"
				ref={drag}
				src={draghandler}
				alt="拖拽此处以排序"
				style={{
					fontSize: '1rem',
					width: '1rem',
					top: 0
				}}
			/>
			{children}
		</div>
	);
};
export default BoxWithHandle;
