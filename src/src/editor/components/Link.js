import * as React from "react";
import { componentClassName } from "../theme";

export default function Link(props) {
  const { attributes, node, children, editor, readOnly } = props;
  const embed = node.data.get("embed");
  const Component = node.data.get("component");
  const href = node.data.get("href");

  if (embed && Component) {
    return <Component {...props} />;
  }

  return (
    <a
      {...attributes}
      className={componentClassName.Link}
      href={readOnly ? href : undefined}
      onClick={
        readOnly
          ? e => {
              if (editor.props.onClickLink) {
                e.preventDefault();
                editor.props.onClickLink(href);
              } else {
                console.warn("please implement onCliclLink prop");
              }
            }
          : undefined
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
