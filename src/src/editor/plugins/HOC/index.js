import React from "react";
const Editor = ({ children, editor, hocs, readOnly }) => {
  return (
    <React.Fragment>
      {children}
      {hocs &&
        hocs.length &&
        hocs.map(hoc => {
          return !readOnly && hoc(editor);
        })}
    </React.Fragment>
  );
};

//要求options.HOC = [(editor,readOnly)=>HighOrderComponent] ,HighOrderComponent为一个接受editor为参数的方法，输出为React.component
export default (options = {}) => {
  if (Array.isArray(options.HOC)) {
    return {
      renderEditor: (props, editor, next) => {
        const children = next();
        return (
          <Editor editor={editor} readOnly={props.readOnly} hocs={options.HOC}>
            {children}
          </Editor>
        );
      }
    };
  } else
    return {
      renderEditor: (props, editor, next) => {
        const children = next();
        return <React.Fragment>{children}</React.Fragment>;
      }
    };
};
