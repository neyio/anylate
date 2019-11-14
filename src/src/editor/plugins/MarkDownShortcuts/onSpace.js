import { getType, addMark } from "./utils";
export default function onSpace(event, editor, next) {
  const { value } = editor;
  const { selection, startBlock } = value;

  //当选区非空，直接放弃操作
  if (selection.isExpanded) {
    return next();
  }

  const chars = startBlock.text.slice(0, selection.start.offset).trim(); //光标位置的偏移量, 去除 两侧的空格

  const type = getType(chars); //计算类型

  //判断类型是否符合处理类型的markdown组件
  if (type && !editor.isSelectionInTable()) {
    //如果类型匹配为heading则址

    if (startBlock.type.match(/heading/) && !type.match(/heading/)) {
      return next();
    }

    // don't allow doubling up a list item
    if (type === "list-item" && startBlock.type === "list-item") {
      return next();
    }
    event.preventDefault();

    let checked;
    if (chars === "- [x]") checked = true;
    if (chars === "- [ ]") checked = false;

    editor.withoutNormalizing(edit => {
      edit
        .moveFocusToStartOfNode(startBlock)
        .delete()
        .setBlocks({
          type,
          data: { checked }
        });

      if (type === "list-item") {
        if (checked !== undefined) {
          return edit.wrapBlock("todo-list");
        } else if (chars === "1.") {
          return edit.wrapBlock("ordered-list");
        } else {
          return edit.wrapBlock("bulleted-list");
        }
      }
      return next();
    });
  }

  return addMark(startBlock, editor) || next();
}
