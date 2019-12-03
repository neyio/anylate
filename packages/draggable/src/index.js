import React from 'react';
import Container from './Container';
import CardHOC from './CardHOC';
import Context from './Context';
const DraggablePlugin = (options = {}) => {
	return {
		renderEditor: (props, editor, next) => {
			return (
				<Container {...props} editor={editor}>
					{next()}
				</Container>
			);
		},
		renderBlock: (props, editor, next) => {
			const { node } = props;
			const { document } = editor.value;
			const children = next();
			if (document.nodes.includes(node)) {
				return (
					<Context.Consumer>
						{({ state, dispatch }) => (
							<CardHOC
								key={'hoc-' + props.node.key}
								node={props.node}
								state={state}
								dispatch={dispatch}
								editor={editor}
							>
								{children}
							</CardHOC>
						)}
					</Context.Consumer>
				);
			} else return <React.Fragment>{children}</React.Fragment>;
		}
	};
};

export default DraggablePlugin;
