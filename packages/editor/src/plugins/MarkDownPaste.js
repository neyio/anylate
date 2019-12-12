import { getEventTransfer } from "slate-react";
import MarkdownSerializer from "slate-md-serializer";

const markdownSerializer = new MarkdownSerializer();

export default function MarkdownPaste() {
  return {
    onPaste(e, editor, next) {
      const transfer = getEventTransfer(e);
      const { text } = transfer;
      if (transfer.type !== "text" && transfer.type !== "html") return next();

      const fragment = markdownSerializer.deserialize(text || "");
      if (!fragment) return;

      return editor.insertFragment(fragment.document);
    }
  };
}
