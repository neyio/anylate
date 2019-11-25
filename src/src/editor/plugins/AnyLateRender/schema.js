import { Block } from 'slate';
const schema = {
	blocks: {
		heading1: {
			nodes: [ { match: { object: 'text' } } ]
		},
		heading2: {
			nodes: [ { match: { object: 'text' } } ]
		},
		heading3: {
			nodes: [ { match: { object: 'text' } } ]
		},
		heading4: {
			nodes: [ { match: { object: 'text' } } ]
		},
		heading5: {
			nodes: [ { match: { object: 'text' } } ]
		},
		heading6: {
			nodes: [ { match: { object: 'text' } } ]
		},

		'horizontal-rule': {
			isVoid: true
		},
		image: {
			isVoid: true
		},
		link: {
			nodes: [ { match: { object: 'text' } } ]
		},
		'block-toolbar': {
			isVoid: true
		},
		'bulleted-list': {
			normalize(editor, { code, node, child }) {
				if (code === 'child_type_invalid') {
					console.log('bulleted-list child_type_invalid');
				}
			}
		},
		'ordered-list': {
			normalize(editor, { code, node, child }) {
				if (code === 'child_type_invalid') {
					console.log('ordered-list child_type_invalid');
				}
			}
		},
		'todo-list': {
			normalize(editor, { code, node, child }) {
				if (code) {
					console.log('error', code);
				}
			}
		},
		'list-item': {
			parent: [ { type: 'bulleted-list' }, { type: 'ordered-list' }, { type: 'todo-list' } ],
			nodes: [
				{
					match: [
						{ object: 'text' },
						{ type: 'image' },
						{ type: 'list-item' },
						{ type: 'paragraph' },
						{ type: 'bulleted-list' },
						{ type: 'ordered-list' },
						{ type: 'todo-list' }
					]
				}
			]
		}
	},
	document: {
		nodes: [
			{
				match: [
					{ type: 'paragraph' },
					{ type: 'heading1' },
					{ type: 'heading2' },
					{ type: 'heading3' },
					{ type: 'heading4' },
					{ type: 'heading5' },
					{ type: 'heading6' },
					{ type: 'block-quote' },
					{ type: 'horizontal-rule' },
					{ type: 'image' },
					{ type: 'bulleted-list' },
					{ type: 'ordered-list' },
					{ type: 'todo-list' },
					{ type: 'block-toolbar' },
					{ type: 'table' },
					{ type: 'link' },
					{ type: 'math' },
					{ type: 'code' }
				],
				min: 1
			}
		],
		last: { type: 'paragraph' },
		normalize(editor, { code, node, child }) {
			console.error(code);
			if (code === 'last_child_type_invalid') {
				console.log('last_child_type_invalid');
				if (editor.value.startBlock.type === 'bulleted-list') {
					console.log('anything need to do here');
				}
				const paragraph = Block.create('paragraph');
				return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
			}
		}
	}
};

export default schema;
