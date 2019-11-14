import { Editor } from "slate-react";
import { Value } from "slate";

import React from "react";
import initialValueAsJson from "./value.json";
import plugins from "./plugins";
import renderBlock from "./renderBlock";
import renderMark from "./renderMark";

const initialValue = Value.fromJSON(initialValueAsJson);

const AnySlate = props => {
  return (
    <div className="markdown-section">
      <Editor
        style={{ position: "relative" }}
        plugins={plugins}
        renderBlock={renderBlock}
        renderMark={renderMark}
        placeholder="Enter some text..."
        defaultValue={initialValue}
      />
    </div>
  );
};

export default AnySlate;
