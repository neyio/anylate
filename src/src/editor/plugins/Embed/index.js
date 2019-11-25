import React from 'react';
import EmbedComponent from './EmbedComponent';

export default (options) => {
	return {
		schema: {
			blocks: {
				embed: {
					isVoid: true
				}
			}
		},
		renderBlock: (props, editor, next) => {
			if (props.node.type === 'embed') return <EmbedComponent {...props} editor={editor} />;
			return next();
		},
		onKeyDown: (event, editor, next) => {
			const { value: { startBlock } } = editor;
			if (startBlock && startBlock.type === 'embed' && event.key === 'Enter') {
				return editor.insertBlock('paragraph');
			}
			return next();
		}
	};
};
