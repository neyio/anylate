import { Block } from 'slate';

export default () => {
	return {
		schema: {
			document: {
				last: { type: 'paragraph' },
				normalize(editor, { code, node, child }) {
					if (code === 'last_child_type_invalid') {
						if (editor.value.startBlock.type === 'bulleted-list') {
							console.log('anything need to do here');
						}
						const paragraph = Block.create('paragraph');
						return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
					}
				}
			}
		}
	};
};
