import MathCode from '@zhujianshi/slate-code-math';
import Code from '@zhujianshi/slate-code-base';
import Table from '@zhujianshi/slate-table';
import '@zhujianshi/slate-code-base/lib/index.css';
import '@zhujianshi/slate-code-math/lib/index.css';
import '@zhujianshi/slate-table/lib/index.css';

import BaseComponents from '@anylate/base-components';
import Draggable from '@anylate/draggable';
import MarkdownSupport from '@anylate/markdown-support';
import JumpOutBlock from '@anylate/jump-out-block';
import HoverMenu from '@anylate/hover-menu';
import Sidebar from '@anylate/sidebar';
import '@anylate/sidebar/lib/index.css';

import MarkDownPaste from './plugins/Paste/MarkDownPaste';
import HtmlPaste from './plugins/Paste/HtmlPaste';

const zhujianshi = [ MathCode(), Code(), Table() ];

export default [
	...zhujianshi,

	Draggable(),
	HoverMenu(),
	Sidebar(),
	JumpOutBlock(),
	MarkdownSupport(),
	HtmlPaste(),
	MarkDownPaste(),
	BaseComponents()
];
