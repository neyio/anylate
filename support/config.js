import factory from './factory'; // copy from https://github.com/ianstormtaylor/slate-plugins/tree/master/support/rollup
import baseComponents from '../packages/base-components/package.json';
import anylateThemes from '../packages/themes/package.json';
import anylateMarkdown from '../packages/markdown-support/package.json';
import anylateJumpOutBlock from '../packages/jump-out-block/package.json';
import draggable from '../packages/draggable/package.json';
import hoverMenu from '../packages/hover-menu/package.json';
import sidebar from '../packages/sidebar/package.json';
import editor from '../packages/editor/package.json';

const configurations = [
  ...factory(anylateThemes),
  ...factory(baseComponents),
  ...factory(anylateMarkdown),
  ...factory(anylateJumpOutBlock),
  ...factory(draggable),
  ...factory(hoverMenu),
  ...factory(sidebar),
  ...factory(editor),
];

export default configurations;
