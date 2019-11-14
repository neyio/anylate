export default function onEnter(e, editor, next) {
  const { value } = editor;
  const { startBlock, selection } = value;
  if (selection.isExpanded) return next();
  if (!startBlock) return next();

  const endOffset = selection.end.offset;

  if (startBlock.type === "image") {
    e.preventDefault();
    return editor.splitBlock(10).setBlocks({
      type: "paragraph",
      text: "",
      isVoid: false
    });
  }

  if (startBlock.type.match(/(heading|block-quote)/)) {
    e.preventDefault();
    editor.showContentBelow(startBlock);
    if (endOffset > 0) {
      return editor.splitBlock().setBlocks("paragraph");
    } else {
      return editor
        .splitBlock()
        .moveToStartOfPreviousBlock()
        .setBlocks("paragraph");
    }
  }

  return next();
}
