import React, { useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { cx } from 'emotion';
import { componentClassName } from '@anylate/themes';

const Card = ({ id, children, dispatch, index, nodeKey, editor, state }) => {
  const { hoverKey, dragKey } = state;
  const moveCard = useCallback(
    (dragKey, hoverKey) => {
      const parentKey = editor.value.document.key;
      if (dragKey === hoverKey) return;
      const hoverIndex = editor.value.document.nodes.findIndex(i => i.key === `${hoverKey}`); // hoverKey > dragKey ? hoverKey - 1 : hoverKey
      return editor.moveNodeByKey(dragKey, parentKey, hoverIndex);
    },
    [editor],
  );
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'card', id, index, nodeKey },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    options: {
      dropEffect: 'copy', // default is move
    },
    begin: item => {
      editor.blur().deselect();
      dispatch({
        type: 'setDragKey',
        payload: nodeKey,
      });
    },
    end: (dropResult, monitor) => {
      try {
        if (dropResult) {
          const { nodeKey: dragKey } = dropResult;
          moveCard(dragKey, hoverKey);
          setTimeout(() => {
            dispatch({
              type: 'clean',
            });
          }, 55);
        }
      } catch (e) {
        console.log('move end ,something seems to be wrong');
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  const borderExtra = (drag, hover) => {
    if (hover !== nodeKey) {
      return {};
    }
    const dragIndex = editor.value.document.nodes.findIndex(i => i.key === `${drag}`);
    const hoverIndex = editor.value.document.nodes.findIndex(i => i.key === `${hover}`);
    if (dragIndex > hoverIndex) {
      return { borderTopColor: 'green' };
    } else {
      return { borderBottomColor: 'green' };
    }
  };
  return (
    <div
      ref={preview}
      style={{
        opacity,
        border:
          hoverKey === nodeKey
            ? '2px solid var(--theme-color-primary,#eee)'
            : '2px solid transparent',
        ...borderExtra(dragKey, hoverKey),
      }}
      className={componentClassName.DragContainer}
    >
      <span
        ref={drag}
        className={cx('iconfont', 'icon-drag', componentClassName.DragHandler)}
        contentEditable={false}
      />
      {children}
    </div>
  );
};
export default Card;
