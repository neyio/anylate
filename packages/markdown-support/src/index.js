import isHotkey from "is-hotkey";
import { Text } from "slate";
import onSpace from "./onSpace";
import onDash from "./onDash";
import onBacktick from "./onBacktick";
import onTab from "./onTab";
import commands from "./commands";
import ifFlow from "./utils/flow";
import markShortcuts from "./markShortcuts";

const MarkdownShortcuts = (options = {}) => {
  const isShiftEnter = isHotkey("shift+enter");
  const isEnter = isHotkey("enter");
  // 注意 此处的 快捷键需要和sideIcon组件的快捷键一一对应
  const isDash = isHotkey("-");
  const isBacktick = isHotkey("`");
  const isSpace = isHotkey(" ");
  const isShiftSpace = isHotkey("shift+ ");
  const isTab = isHotkey("tab");
  const setParagraph = isHotkey("mod+p");
  const setHeading1 = isHotkey("mod+1");
  const setHeading2 = isHotkey("mod+2");
  const setHeading3 = isHotkey("mod+3");
  const setHeading4 = isHotkey("mod+4");
  const setHeading5 = isHotkey("mod+5");
  const setHeading6 = isHotkey("mod+6");
  const setOrderedList = isHotkey("mod+shift+l");
  const setBulletedList = isHotkey("mod+l");
  const setTodoList = isHotkey("mod+o");
  const setBlockQuote = isHotkey("mod+m");
  const insertHr = isHotkey("mod+h");
  const insertCode = isHotkey("mod+shift+c");
  const insertFormula = isHotkey("mod+shift+f");
  const insertTable = isHotkey("mod+opt+t");
  const saveToJson = isHotkey("mod+s");
  const isInListItemOnEnter = (event, editor) => {
    const { startBlock } = editor.value;
    if (
      isShiftEnter(event) &&
      startBlock.type === "paragraph" &&
      startBlock.text === ""
    ) {
      return false;
    } else {
      if (isEnter(event) && startBlock.type === "paragraph") {
        const parent = editor.value.document.getParent(startBlock.key);
        if (parent && parent.type === "list-item") {
          return true;
        }
      }
    }
    return false;
  };
  const isInListItemEmpty = (event, editor) => {
    const { startBlock } = editor.value;
    if (
      isEnter(event) &&
      startBlock.type === "paragraph" &&
      startBlock.text === ""
    ) {
      const parent = editor.value.document.getParent(startBlock.key);
      if (parent && parent.type === "list-item") {
        return true;
      }
    }
    return false;
  };
  return {
    commands,
    onKeyDown(e, editor, next) {
      const { value } = editor;
      const { startBlock } = value;
      if (!startBlock) return next();
      if (startBlock.type.match(/code/)) return next();

      return ifFlow(
        [
          () => isInListItemOnEnter(event, editor),
          () => {
            event.preventDefault();
            // const parent = editor.value.document.getParent(startBlock.key);
            // const path = editor.value.document.getPath(parent);
            editor.splitBlock(2);
          }
        ],
        [
          () => isInListItemEmpty(event, editor),
          () => {
            console.log("empty p in li");
            editor.unwrapBlock("list-item");
          }
        ],
        [isDash, options.onDash || onDash],
        [isBacktick, options.onBacktick || onBacktick],
        [isSpace, options.onSpace || onSpace],
        [isShiftSpace, options.onSpace || onSpace],
        [isTab, options.onTab || onTab],
        [
          insertCode,
          () => {
            //  const codeBlockKey = editor.insertCodeBlock('js', ' ').getClosestCodeBlock();editor.wrapBlockByKey(codeBlockKey, 'list-item').wrapBlockByKey(codeBlockKey, 'paragraph');});
            if (startBlock.type === "list-item") {
              return;
            }
            editor.insertCodeBlock("js", "");
          }
        ],
        [
          insertFormula,
          () => {
            if (startBlock.type === "list-item") {
              console.warn("math is not support in list-item");
              return;
            }
            editor.focus().insertMathBlock();
          }
        ],
        [
          insertTable,
          () => {
            if (startBlock.type === "list-item") {
              return;
            }
            editor
              .focus()
              .insertTable(3, 2, () => () => ({ nodes: [Text.create("")] }));
          }
        ],
        [
          setParagraph,
          () => editor.handlerShortCut("paragraph") && e.preventDefault()
        ],
        [
          setHeading1,
          () => editor.handlerShortCut("heading1") && e.preventDefault()
        ],
        [
          setHeading2,
          () => editor.handlerShortCut("heading2") && e.preventDefault()
        ],
        [
          setHeading3,
          () => editor.handlerShortCut("heading3") && e.preventDefault()
        ],
        [
          setHeading4,
          () => editor.handlerShortCut("heading4") && e.preventDefault()
        ],
        [
          setHeading5,
          () => editor.handlerShortCut("heading5") && e.preventDefault()
        ],
        [
          setHeading6,
          () => editor.handlerShortCut("heading6") && e.preventDefault()
        ],
        [insertHr, () => editor.handlerShortCut("hr") && e.preventDefault()],
        [
          setOrderedList,
          () => editor.handlerShortCut("ordered") && e.preventDefault()
        ],
        [
          setBulletedList,
          () => editor.handlerShortCut("bulleted") && e.preventDefault()
        ],
        [
          setTodoList,
          () => editor.handlerShortCut("undo") && e.preventDefault()
        ],
        [
          setBlockQuote,
          () => editor.handlerShortCut("block-quote") && e.preventDefault()
        ],
        [
          saveToJson,
          () => {
            e.preventDefault();
            console.log(
              "调试用",
              JSON.stringify(editor.value.toJSON(editor.value.document.key))
            );
          }
        ],
        ...markShortcuts(e, editor, next),
        [() => true, () => next()]
      )(e, editor, next);
    }
  };
};

export default MarkdownShortcuts;
