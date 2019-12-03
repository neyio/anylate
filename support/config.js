/* 
  this file copy from 
  https://github.com/ianstormtaylor/slate-plugins/tree/master/support/rollup 
  and add some custom changes
*/

import factory from './factory';
import baseComponents from '../packages/base-components/package.json';
import anylateThemes from '../packages/themes/package.json';
import anylateMarkdown from '../packages/markdown-support/package.json';
import anylateJumpOutBlock from '../packages/jump-out-block/package.json';
import draggable from '../packages/draggable/package.json';

const configurations = [
	...factory(anylateThemes),
	...factory(baseComponents),
	...factory(anylateMarkdown),
	...factory(anylateJumpOutBlock),
	...factory(draggable)
];

export default configurations;
