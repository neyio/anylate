import React from "react";
import TodoItem from "./TodoItem";
import { cx, css } from "emotion";
import { componentClassName } from "../theme";
const ListItem = React.forwardRef(
  ({ children, node, attributes, ...props }, ref) => {
    const checked = node.data.get("checked");
    if (checked !== undefined) {
      return (
        <TodoItem ref={ref} node={node} attributes={attributes} {...props}>
          {children}
        </TodoItem>
      );
    }
    return (
      <li
        ref={ref}
        {...attributes}
        className={cx(
          css`
            margin-bottom: 0.5rem;
          `,
          componentClassName.ListItem
        )}
      >
        {children}
      </li>
    );
  }
);
export default ListItem;
