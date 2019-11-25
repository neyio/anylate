### isVoid
在真实dom中 hr容易被类似wrapperblock组件给包裹，导致选区无法被删除，加上isVoid保证不进入内部。 这个组件存在光标无法进入的问题，也就是点击组件，使得光标位置为组件本身，我们加了一个外边框表示该成员被选中了

### 获取当前激活的mark，样例

```js	
const inCodeMark = value.activeMarks.filter(i => i.type === 'code');
  if (inCodeMark && inCodeMark.length) {
    editor.splitBlock().setMark('code');
    return next();
}
```