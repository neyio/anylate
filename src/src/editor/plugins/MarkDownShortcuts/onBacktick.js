export default function onBacktick(ev, editor, next) {
  const { value } = editor;
  const { startBlock, selection } = value;
  if (selection.isExpanded) return next();
  if (startBlock.type.match(/heading/)) return next();

  const chars = startBlock.text
    .slice(0, selection.start.offset)
    .replace(/\s*/g, "");

  if (chars === "``") {
    ev.preventDefault();
    return editor
      .moveFocusToStartOfNode(startBlock)
      .delete()
      .setBlocks({ type: "code" });
  }

  return next();
}
