import React from 'react';
import { cx } from 'emotion';
import './list.css';

const List = props => {
  const { items, editor, node, hiddenMenu } = props;
  const clickHandler = item => {
    console.log('clickHandler', editor, node);

    hiddenMenu();
    if (item.handler) {
      return item.handler(editor);
    }
    if (['ordered', 'undo', 'finished', 'bulleted'].includes(item.block)) {
      const map = {
        ordered: '1.',
        undo: '-[]',
        finished: '-[x]',
        bulleted: '-',
      };
      return editor.wrapListItem(map[item.block] || '-');
    }

    editor
      .focus()
      .moveToEnd()
      .setBlocks(item.block);
  };
  return (
    <ul className="a-menu-list">
      {items.map((item, index) => {
        return (
          <li key={index} className="a-menu-item" onClick={() => clickHandler(item)}>
            <span className="a-menu-item-text">
              <span className={cx('a-menu-item-icon', 'iconfont', item.icon)} /> {item.text}
            </span>
            <span className="short-cut">{item.shortCut}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
