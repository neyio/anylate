import React from "react";

import { css, cx } from "emotion";
import { componentClassName } from "../theme";
const TodoList = React.forwardRef((props, ref) => {
  return (
    <ul
      ref={ref}
      className={cx(
        css`
          list-style: none;
          padding: 0;
          ul {
            padding-left: 1em;
          }
        `,
        componentClassName.ToDoList
      )}
    >
      {props.children}
    </ul>
  );
});

export default TodoList;
