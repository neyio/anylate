const schema = {
  code: {
    marks: [""]
  },
  blocks: {
    heading1: {
      nodes: [{ match: { object: "text" } }]
    },
    heading2: {
      nodes: [{ match: { object: "text" } }]
    },
    heading3: {
      nodes: [{ match: { object: "text" } }]
    },
    heading4: {
      nodes: [{ match: { object: "text" } }]
    },
    heading5: {
      nodes: [{ match: { object: "text" } }]
    },
    heading6: {
      nodes: [{ match: { object: "text" } }]
    },

    "horizontal-rule": {
      isVoid: true
    },
    image: {
      isVoid: true
    },
    link: {
      nodes: [{ match: { object: "text" } }]
    },
    "block-toolbar": {
      isVoid: true
    },
    "list-item": {
      parent: [
        { type: "bulleted-list" },
        { type: "ordered-list" },
        { type: "todo-list" }
      ],
      nodes: [
        {
          match: [
            { object: "text" },
            { type: "image" },
            { type: "paragraph" },
            { type: "bulleted-list" },
            { type: "ordered-list" },
            { type: "todo-list" }
          ]
        }
      ]
    }
  },
  document: {
    nodes: [
      {
        match: [
          { type: "paragraph" },
          { type: "heading1" },
          { type: "heading2" },
          { type: "heading3" },
          { type: "heading4" },
          { type: "heading5" },
          { type: "heading6" },
          { type: "block-quote" },
          { type: "code" },
          { type: "horizontal-rule" },
          { type: "image" },
          { type: "bulleted-list" },
          { type: "ordered-list" },
          { type: "todo-list" },
          { type: "block-toolbar" },
          { type: "table" },
          { type: "link" }
        ],
        min: 1
      }
    ]
  }
};

export default schema;
