import { Block } from 'slate';

export default () => {
	return {
		schema: {
			document: {
				last: { type: 'paragraph' },
				normalize: (editor, { code, node, child }) => {
					if (code === 'last_child_type_invalid') {
						console.log('last_child_type_invalid is fired!');
						const paragraph = Block.create('paragraph');
						return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
					}
				}
			}
		}
	};
};
