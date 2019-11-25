export const onEnterInHeading = (startBlock, { editor, event }) => {
  if (startBlock.type.match(/^heading/)) {
    event.preventDefault();
    editor.splitBlock().setBlocks("paragraph");
    return true;
  }
  return false;
};

export const insertHeading = (startBlock, { event, editor }, token) => {
  event.preventDefault();
  const { text } = token;
  const { key } = startBlock.getFirstText();
  editor
    .setBlocks("heading")
    .setNodeByKey(startBlock.key, { data: { depth: token.depth } })
    .setTextByPath(editor.value.document.getPath(key), text);
  return true;
};
