import React from "react";
import { cx, css } from "emotion";
import { componentClassName } from "../theme";

class CheckListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:
        (this.props.node &&
          this.props.node.data &&
          this.props.node.data.get("checked")) ||
        false
    };
  }
  onChange = event => {
    const checked = event.target.checked;
    const { editor, node } = this.props;
    editor.setNodeByKey(node.key, { data: { checked } });
    event.stopPropagation();
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    const { attributes, children, readOnly } = this.props;
    const { checked } = this.state;
    return (
      <li
        {...attributes}
        className={cx(
          css`
            display: flex;
            flex-direction: row;
            align-items: center;
            & + & {
              margin-top: 0;
            }
          `,
          componentClassName.ToDoItem
        )}
      >
        <span
          contentEditable={false}
          className={css`
            margin-right: 0.75em;
          `}
        >
          <input type="checkbox" checked={checked} onChange={this.onChange} />
        </span>
        <span
          contentEditable={!readOnly}
          suppressContentEditableWarning
          className={css`
            flex: 1;
            opacity: ${checked ? 0.666 : 1};
            text-decoration: ${checked ? "line-through" : "none"};
            &:focus {
              outline: none;
            }
          `}
        >
          {children}
        </span>
      </li>
    );
  }
}

export default CheckListItem;