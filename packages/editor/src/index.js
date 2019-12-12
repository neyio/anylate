import React from 'react';
import { Editor } from 'slate-react';
import BaseComponents from '@anylate/base-components';
import Draggable from '@anylate/draggable';
import MarkdownSupport from '@anylate/markdown-support';
import JumpOutBlock from '@anylate/jump-out-block';
import HoverMenu from '@anylate/hover-menu';
import Sidebar from '@anylate/sidebar';
import '@anylate/sidebar/lib/index.css';

import MathCode from '@zhujianshi/slate-code-math';
import Code from '@zhujianshi/slate-code-base';
import Table from '@zhujianshi/slate-table';
import List from '@zhujianshi/slate-list';
import '@zhujianshi/slate-code-math/lib/index.css';

import MarkDownPaste from './plugins/MarkDownPaste';
import HtmlPaste from './plugins/HtmlPaste';

const zhujianshi = [
  MathCode(),
  Code({ blockName: 'any-code-block' }),
  Table({
    className: {
      tool: ['table-menu', 'row-menu', 'col-menu'],
      'icon-bar': ['table', 'row', 'col'],
      'custom-rc': ['tooltip'],
      name: 'any-table',
    },
  }),
];

const plugins = [
  Draggable(),
  ...zhujianshi,
  List({ blockName: 'any-list-block' }),
  HoverMenu(),
  Sidebar(),
  JumpOutBlock(),
  MarkdownSupport(),
  HtmlPaste(),
  MarkDownPaste(),
  BaseComponents(),
];

const AnySlate = ({ plugins: customPlugins = [], ...rest }) => {
  const allPlugins = customPlugins.concat(plugins || []);
  return <Editor plugins={allPlugins} {...rest} />;
};

export default AnySlate;
