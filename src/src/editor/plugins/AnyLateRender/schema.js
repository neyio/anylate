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
				console.log('bulleted-list', 0);
				if (code === 'child_type_invalid') {
					console.log('bulleted-list child_type_invalid');
				}
			}
		},
		'ordered-list': {
			normalize(editor, { code, node, child }) {
				console.log('ordered-list', 123);
				if (code === 'child_type_invalid') {
					console.log('ordered-list child_type_invalid');
				}
			}
		},
		'todo-list': {
			normalize(editor, { code, node, child }) {
				console.log('todo-list', 456);
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
		last: [
			{ type: 'paragraph' },
			{ type: 'list-item' },
			{ type: 'heading1' },
			{ type: 'heading1' },
			{ type: 'heading2' },
			{ type: 'heading3' },
			{ type: 'heading4' },
			{ type: 'heading5' },
			{ type: 'heading6' }
		],
		normalize(editor, { code, node, child }) {
			console.log('TCL: normalize -> code', code, child);
			if (code === 'last_child_type_invalid') {
				const paragraph = Block.create('paragraph');
				editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
				if (editor.value.startBlock.text === '') {
					if ([ 'bulleted-list', 'ordered-list', 'todo-list' ].includes(child.type))
						editor.delete().removeNodeByKey(child.key);
				}
				return editor;
			}
		}
	}
};

export default schema;
