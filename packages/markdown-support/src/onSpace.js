import { getType, inlineShortcuts } from './utils';

const ifCodeBlockMatch = str => {
  return str === '```';
};

export default function onSpace(event, editor, next) {
  const { value } = editor;
  const { selection, startBlock } = value;

  // 当选区非空，直接放弃操作
  if (selection.isExpanded) {
    return next();
  }

  const chars = startBlock.text.slice(0, selection.start.offset).trim(); // 光标位置的偏移量, 去除 两侧的空格
  const type = getType(chars); // 计算类型
  // 判断类型是否符合处理类型的markdown组件
  if (type) {
    console.log('TCL: onSpace -> type', type);
    // 如果类型匹配为heading则址
    if (type.match(/block-quote/)) {
      event.preventDefault(); // 防止添加开头空格
    }
    if (type.match(/heading/) || type.match('paragraph')) {
      if (startBlock.type !== 'list-item') {
        // 命中如果不是列表则防止空格
        event.preventDefault();
      }
      if (startBlock.type.match(/heading/) && !type.match(/heading/)) {
        return next();
      }
    }
    if (type === 'list-item') {
      console.log('not here');
      return next();
    }
    if (startBlock.type !== 'list-item')
      return editor
        .moveFocusToStartOfNode(startBlock)
        .delete()
        .setBlocks(type);
  }

  editor.withoutNormalizing(editor => {
    const list = startBlock.getTexts();
    list.forEach(firstText => {
      for (const key of inlineShortcuts) {
        const { mark, shortcut, reg, type, wrap } = key;
        const text = firstText.text;
        let inlineTags = [];
        const result = reg.exec(text);
        if (result) {
          console.log(result, type);
          inlineTags = [result.index, result.index + result[0].length];
          const [start, end] = inlineTags;
          if (ifCodeBlockMatch(result[0])) {
            break;
          }
          if (type === 'block' && wrap === 'image') {
            event.preventDefault();
            const [, label, uri] = /\[(\S*)\]\((\S*)\)/.exec(result[0]);
            editor
              .removeTextByKey(firstText.key, start, result[0].length)
              .splitBlock()
              .setBlocks({
                type: 'image',
                data: { src: uri, alt: label },
              })
              .moveForward(1);
            break;
          }
          if (type === 'inline' && wrap === 'link') {
            event.preventDefault();
            const [, label, uri] = /\[(\S+)\]\((\S+)\)/.exec(result[0]);
            editor
              .removeTextByKey(firstText.key, end - uri.length - 3, uri.length + 3)
              .removeTextByKey(firstText.key, start, 1)
              .moveStartTo(firstText.key, start)
              .moveEndTo(firstText.key, start + label.length)
              .wrapInline({
                type: 'link',
                data: { href: uri },
              })
              .moveToEnd();
            break;
          }

          editor
            .removeTextByKey(firstText.key, end - shortcut.length, shortcut.length)
            .removeTextByKey(firstText.key, start, shortcut.length)
            .moveAnchorTo(start, end - shortcut.length)
            .addMark(mark)
            .moveToEnd()
            .removeMark(mark);
          break;
        }
      }
    });
  });
  return next();
}
