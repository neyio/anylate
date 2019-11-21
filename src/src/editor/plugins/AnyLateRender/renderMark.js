import React from "react";

export default function renderMark(props, editor, next) {
  switch (props.mark.type) {
    case "bold":
      return <strong>{props.children}</strong>;
    case "code":
      return <code>{props.children}</code>;
    case "italic":
      return <em>{props.children}</em>;
    case "underlined":
      return <u>{props.children}</u>;
    case "deleted":
      return <del>{props.children}</del>;
    case "inserted":
      return <mark>{props.children}</mark>;
    default:
      return next();
  }
}
