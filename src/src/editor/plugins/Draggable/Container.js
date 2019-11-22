import React, { useEffect, useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Context from './Context';
const reducer = (state, action) => {
	switch (action.type) {
		case 'setHover':
			console.log('setHover fired');
			return { ...state, hoverKey: action.payload };
		case 'setDragKey':
			return { ...state, dragKey: action.payload };
		case 'clean':
			return { hoverKey: null, dragKey: null };
		default:
			console.warn('NONE REDUCER HITTED!');
			return { ...state };
	}
};
const Container = (props) => {
	const [ state, dispatch ] = useReducer(reducer, { hoverKey: null, dragKey: null });
	useEffect(() => {
		console.log('init container');
		return () => {
			console.log('clean container');
		};
	}, []);
	return (
		<div className="container">
			<Context.Provider value={{ state, dispatch }}>
				<DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
			</Context.Provider>
		</div>
	);
};

export default Container;
