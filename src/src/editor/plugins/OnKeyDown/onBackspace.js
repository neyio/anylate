export default function onBackspace(e, editor, next) {
  const { value } = editor;
  const { startBlock, selection } = value;
  if (!startBlock) return next();

  // If image or embed is selected go ahead and delete the whole block
  if (startBlock.type === "image" || startBlock.type === "link") {
    e.preventDefault();
    return editor.removeNodeByKey(startBlock.key).moveToStartOfNextBlock();
  }

  if (selection.isExpanded) {
    // If we're about to remove a heading then ensure that its not collapsed
    if (
      selection.start.offset === 0 &&
      selection.end.offset === startBlock.text.length &&
      startBlock.type.match(/heading/)
    ) {
      editor.showContentBelow(startBlock);
    }

    return next();
  }

  // If at the start of a non-paragraph, convert it back into a paragraph
  if (selection.start.offset === 0) {
    if (startBlock.type === "paragraph" || startBlock.type === "code-line")
      return next();
    e.preventDefault();

    // If we're about to remove a heading then ensure that its not collapsed
    if (startBlock.type.match(/heading/)) {
      editor.showContentBelow(startBlock);
    }
    editor.setBlocks("paragraph");

    if (startBlock.type === "list-item") {
      editor.unwrapBlock("bulleted-list");
    }

    return;
  }

  if (selection.isCollapsed) {
    const marksAtCursor = startBlock.getMarksAtRange(selection);
    const codeMarksAtCursor = marksAtCursor.filter(
      mark => mark.type === "code"
    );

    // If at the end of a code mark hitting backspace should remove the mark
    if (codeMarksAtCursor.size > 0) {
      e.preventDefault();

      let iterationOffset = 0;
      const startOffset = selection.start.offset;
      const textNode = startBlock.getTextAtOffset(startOffset);
      const leavesUntilCode = textNode.leaves.takeUntil(v => {
        iterationOffset += v.text.length;
        return iterationOffset > startOffset;
      });

      const textUntilCode = leavesUntilCode.map(l => l.text).join("");
      const codeLeaf = leavesUntilCode.reverse().first();

      if (!codeLeaf) return next();
      if (startOffset !== textUntilCode.length) return next();

      return editor.removeMarkByKey(
        textNode.key,
        startOffset - codeLeaf.text.length,
        startOffset,
        "code"
      );
    }
  }
  return next();
}
