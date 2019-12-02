import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import throttle from 'lodash/throttle';
import { cx, css } from 'emotion';
const th = throttle((item, monitor, node, dispatch) => {
	console.log('before setHover', item, monitor, node.key);
	const { nodeKey } = item;
	if (nodeKey !== node.key) {
		dispatch({
			type: 'setHover',
			payload: node.key
		});
	}
}, 50);

const CardHOC = ({ node, editor, state, dispatch, children, ...props }) => {
	const [ , drop ] = useDrop({
		accept: 'card',
		hover: (item, monitor) => {
			th(item, monitor, node, dispatch);
		},
		drop: (dropResult, monitor) => {
			console.log('drop!!!!!! enddrop', dropResult);
		}
	});
	return (
		<Card
			{...props}
			key={node.key}
			index={node.key}
			nodeKey={node.key}
			editor={editor}
			id={node.key}
			state={state}
			dispatch={dispatch}
		>
			<figure
				className={cx(css`
					padding: 0;
					margin: 0;
				`)}
				ref={drop}
			>
				{children}
			</figure>
		</Card>
	);
};

export default CardHOC;
