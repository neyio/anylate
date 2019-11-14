import React from "react";
import classnames from "classnames";
import { componentClassName } from "../theme";
const Paragraph = React.forwardRef(
  ({ children, placeholderVisible, ...attributes }, ref) => {
    return (
      <div
        ref={ref}
        {...attributes}
        className={classnames(
          placeholderVisible ? componentClassName.ParagraphPlaceHolder : ""
        )}
      >
        {children}
      </div>
    );
  }
);
export default Paragraph;
