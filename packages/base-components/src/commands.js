import { Block } from 'slate';

export default {
  insertEmbed(editor) {
    const node = Block.create({
      object: 'block',
      type: 'embed',
      data: {
        url: 'http://player.youku.com/embed/XNDQyODk4MjUzMg==',
      },
      nodes: [
        {
          object: 'text',
          text: '',
          marks: [],
        },
      ],
    });
    return editor.insertBlock(node);
  },
};
