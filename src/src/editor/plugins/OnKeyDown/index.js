import { isModKey } from "../../utils";
import onEnterHandler from "./onEnter";
import onTabHandler from "./onTab";
import onBackspaceHandler from "./onBackspace";

export default function KeyboardBehavior(options = {}) {
  const onEnter = options.onEnter || onEnterHandler;
  const onTab = options.onEnter || onTabHandler;
  const onBackspace = options.onEnter || onBackspaceHandler;

  return {
    onKeyDown(e, editor, next) {
      if (isModKey(e)) return next();
      switch (e.key) {
        case "Enter":
          return onEnter(e, editor, next);
        case "Tab":
          return onTab(e, editor, next);
        case "Backspace":
          return onBackspace(e, editor, next);
        default:
          return next();
      }
    }
  };
}
