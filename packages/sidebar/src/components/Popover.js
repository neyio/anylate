import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';

let Popover = null;
let ref = null;

export default (function createPopover() {
  if (!Popover) {
    Popover = props => {
      ref = useRef(null);
      const root = window.document.body;
      return ReactDOM.createPortal(
        <div
          ref={ref}
          className={css`
            position: absolute;
          `}
        >
          {props.children}
        </div>,
        root,
      );
    };
  }
  return {
    Popover,
    ref,
  };
})();
