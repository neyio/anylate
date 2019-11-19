if (!subType) return next();
const { type: itemType } = subType;
// 允许列表嵌套列表，就开始增加wrap层数
console.log("child itemType", itemType);
const needWrapBlock = editor.value.document.getClosestBlock(
  startBlock.key,
  i => {
    return (
      i.type === "bulleted-list" ||
      i.type === "numbered-list" ||
      i.type === "todo-list"
    );
  }
)
  ? false
  : true;
// editor.moveFocusToStartOfNode(startBlock).delete();
switch (itemType) {
  case "ordered":
    return needWrapBlock
      ? editor
          .setBlocks("list-item")
          .wrapBlock("ordered-list")
          .moveFocusToStartOfNode(startBlock)
      : // .delete()
        editor.setBlocks("list-item");
  case "bulleted":
    return needWrapBlock
      ? editor
          .setBlocks("list-item")
          .wrapBlock("bulleted-list")
          .moveFocusToStartOfNode(startBlock)
      : // .delete()
        editor.setBlocks("list-item");
  case "undo":
    return needWrapBlock
      ? editor
          .setBlocks({ type: "list-item", data: { checked: false } })
          .wrapBlock("todo-list")
          .moveFocusToStartOfNode(startBlock)
      : // .delete()
        editor.setBlocks("list-item");
  case "finished":
    return needWrapBlock
      ? editor
          .setBlocks({ type: "list-item", data: { checked: true } })
          .wrapBlock("todo-list")
          .moveFocusToStartOfNode(startBlock)
      : // .delete()
        editor.setBlocks("list-item");
  default:
    return;
}
return;
