import { isModKey } from "./utils";
import onEnterHandler from "./onEnter";
import onBackspaceHandler from "./onBackspace";
import onDash from "./onDash";

export default function KeyboardBehavior(options = {}) {
  const onEnter = options.onEnter || onEnterHandler;
  const onBackspace = options.onBackspace || onBackspaceHandler;

  return {
    onKeyDown(e, editor, next) {
      if (isModKey(e)) return next();
      switch (e.key) {
        case "Enter":
          return onEnter(e, editor, next);
        case "Backspace":
          return onBackspace(e, editor, next);
        case "-":
          return onDash(e, editor, next);
        default:
          return next();
      }
    }
  };
}
