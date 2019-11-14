export default function onTab(e, editor, next) {
  const { value } = editor;
  const { startBlock } = value;
  if (!startBlock) return next();

  if (startBlock.type === "heading1") {
    e.preventDefault();
    return editor.splitBlock().setBlocks("paragraph");
  }

  return next();
}
