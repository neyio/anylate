/* 
  this file copy from 
  https://github.com/ianstormtaylor/slate-plugins/tree/master/support/rollup 
  and add some custom changes
*/

import factory from './factory';
import slateBaseComponents from '../packages/slate-base-components/package.json';
import slateUtils from '../packages/slate-md-support/package.json';

const configurations = [...factory(slateUtils), ...factory(slateBaseComponents)];

export default configurations;
