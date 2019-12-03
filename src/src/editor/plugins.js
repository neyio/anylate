import BaseComponents from '@anylate/base-components';
import Draggable from '@anylate/draggable';
import MarkdownSupport from '@anylate/markdown-support';
import JumpOutBlock from '@anylate/jump-out-block';
import HoverMenu from '@anylate/hover-menu';

import MathCode from '@zhujianshi/slate-code-math';
import Code from '@zhujianshi/slate-code-base';
import Table from '@zhujianshi/slate-table';

import '@zhujianshi/slate-code-base/lib/index.css';
import '@zhujianshi/slate-code-math/lib/index.css';
import '@zhujianshi/slate-table/lib/index.css';

import MarkDownPaste from './plugins/Paste/MarkDownPaste';
import HtmlPaste from './plugins/Paste/HtmlPaste';
import SideIcon from './plugins/Toolbar/SideIcon';

export default [
	Draggable(),
	HoverMenu(),
	MathCode(),
	Code(),
	Table(),
	SideIcon(),
	JumpOutBlock(),
	MarkdownSupport(),
	HtmlPaste(),
	MarkDownPaste(),
	BaseComponents()
];
