import * as React from "react";
import copy from "copy-to-clipboard";

class CopyToClipboard extends React.Component {
  onClick = e => {
    const { text, onCopy, children } = this.props;
    const elem = React.Children.only(children);
    copy(text);

    if (onCopy) onCopy();

    if (elem && elem.props && typeof elem.props.onClick === "function") {
      elem.props.onClick(e);
    }
  };

  render() {
    const { text: _text, onCopy: _onCopy, children, ...rest } = this.props;
    const elem = React.Children.only(children);
    return React.cloneElement(elem, { ...rest, onClick: this.onClick });
  }
}

export default CopyToClipboard;
