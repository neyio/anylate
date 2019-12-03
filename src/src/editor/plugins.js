import BaseComponents from '@anylate/base-components';
import Draggable from '@anylate/draggable';
import MarkdownSupport from '@anylate/markdown-support';
import JumpOutBlock from '@anylate/jump-out-block';
import MathCode from '@zhujianshi/slate-code-math';
import Code from '@zhujianshi/slate-code-base';
import Table from '@zhujianshi/slate-table';

import '@zhujianshi/slate-code-base/lib/index.css';
import '@zhujianshi/slate-code-math/lib/index.css';
import '@zhujianshi/slate-table/lib/index.css';


import MarkDownPaste from './plugins/Paste/MarkDownPaste';
import HtmlPaste from './plugins/Paste/HtmlPaste';
import HOC from './plugins/HOC/index';
import HoverMenu from './plugins/HOC/HoverMenu';
import Image from './plugins/Image';
import Embed from './plugins/Embed';
import SideIcon from './plugins/Toolbar/SideIcon';

export default [
	Draggable(),
	HOC({ plugins: [ HoverMenu ] }),
	MathCode(),
	Code(),
	Table(),
	SideIcon(),
	JumpOutBlock(),
	MarkdownSupport(),
	HtmlPaste(),
	MarkDownPaste(),
	Image({
		extensions: [ 'png', 'jpeg', 'jpg' ],
		insertImage: (editor, src) => {
			editor.insertImageFile(src);
		}
	}),
	Embed(),
	BaseComponents()
];
