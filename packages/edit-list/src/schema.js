
function schema(opts) {
	const constructedSchema = {
		blocks: {
			[opts.typeItem]: {
				parent: { types: opts.types },
				nodes: [ { objects: [ 'block' ] } ],

				normalize: normalize({
					parent_type_invalid: (editor, context) =>
						editor.unwrapBlockByKey(context.node.key, {
							normalize: false
						}),
					child_object_invalid: (editor, context) => wrapChildrenInDefaultBlock(opts, editor, context.node)
				})
			}
		}
	};

	opts.types.forEach((type) => {
		constructedSchema.blocks[type] = {
			nodes: [ { types: [ opts.typeItem ] } ],
			normalize: normalize({
				child_type_invalid: (editor, context) =>
					editor.wrapBlockByKey(context.child.key, opts.typeItem, {
						normalize: false
					})
			})
		};
	});

	return constructedSchema;
}


function normalize(reasons) {
	return (editor, reason, context) => {
		const reasonFn = reasons[reason];
		if (reasonFn) {
			reasonFn(editor, context);
		}
	};
}


function wrapChildrenInDefaultBlock(opts, editor, node) {
	editor.wrapBlockByKey(node.nodes.first().key, opts.typeDefault, {
		normalize: false
	});

	const wrapper = editor.value.document.getDescendant(node.key).nodes.first();

	// Add in the remaining items
	node.nodes.rest().forEach((child, index) =>
		editor.moveNodeByKey(child.key, wrapper.key, index + 1, {
			normalize: false
		})
	);

	return editor;
}

export default schema;
