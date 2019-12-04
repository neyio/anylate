import { Block } from 'slate';

function normalize(actions) {
	return (editor, code, context) => {
		console.log('TCL: normalize -> actions', actions);
		const handler = actions[code];
		if (handler) {
			handler(editor, context);
		}
	};
}

function wrapInvalidListChildren(editor, node) {
	editor.wrapBlockByKey(node.nodes.first().key, 'paragraph', {
		normalize: false
	});
	const wrapper = editor.value.document.getDescendant(node.key).nodes.first();
	node.nodes.rest().forEach((child, index) =>
		editor.moveNodeByKey(child.key, wrapper.key, index + 1, {
			normalize: false
		})
	);
	return editor;
}

const normalizeInvalidListItemChild = (editor, { child }) =>
	editor.wrapBlockByKey(child.key, 'list-item', {
		normalize: false
	});

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
		embed: {
			isVoid: true
		},
		link: {
			nodes: [ { match: { object: 'text' } } ]
		},
		'block-toolbar': {
			isVoid: true
		},
		'bulleted-list': {
			nodes: [ { types: [ 'list-item' ] } ],
			normalize: normalize({
				child_type_invalid: normalizeInvalidListItemChild
			})
		},
		'ordered-list': {
			nodes: [ { types: [ 'list-item' ] } ],
			normalize: normalize({
				child_type_invalid: normalizeInvalidListItemChild
			})
		},

		'todo-list': {
			nodes: [ { types: [ 'list-item' ] } ],
			normalize: normalize({
				child_type_invalid: normalizeInvalidListItemChild
			})
		},
		'list-item': {
			parent: [ { type: 'bulleted-list' }, { type: 'ordered-list' }, { type: 'todo-list' } ],
			nodes: [ { objects: [ 'block' ] } ],
			normalize: normalize({
				parent_type_invalid: (editor, { node }) =>
					editor.unwrapBlockByKey(node.key, {
						normalize: false
					}),
				child_object_invalid: (editor, { node }) => wrapInvalidListChildren(editor, node)
			})
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
					{ type: 'code' },
					{ type: 'embed' }
				],
				min: 1
			}
		],
		last: [
			{ type: 'paragraph' },
			{ type: 'block-quote' },
			{ type: 'code' },
			{ type: 'math' },
			{ type: 'embed' },
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
