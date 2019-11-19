export default function onBackspace(event, editor, next) {
  const { value } = editor;
  const { selection } = value;

  if (selection.isExpanded || selection.start.offset !== 0) {
    return next();
  }

  const { startBlock } = value;
  if (startBlock.type === "paragraph") {
    return next();
  }

  // if (value.isCollapsed && value.startBlock.type === 'check-list-item' && value.selection.startOffset === 0) {
  // 	editor.setBlocks('paragraph');
  // 	return;
  // }

  event.preventDefault();
  editor.setBlocks("paragraph");
  if (startBlock.type === "list-item") {
    const { type: parentType } = value.document.getParent(startBlock.key);
    editor.unwrapBlock(parentType);
  }
}
