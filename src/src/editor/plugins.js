import Code from '@zhujianshi/slate-code-base';
import Math from '@zhujianshi/slate-code-math';
import '@zhujianshi/slate-code-base/lib/index.css';
import '@zhujianshi/slate-code-math/lib/index.css';
import MarkDownShortcuts from './plugins/MarkDownShortcuts';
import KeyboardShortcuts from './plugins/KeyboardShortcuts';
import OnKeyDown from './plugins/OnKeyDown';
import MarkDownPaste from './plugins/Paste/MarkDownPaste';
import HOC from './plugins/HOC/index';
import HoverMenu from './plugins/HOC/HoverMenu';
import Image from './plugins/Image';
import Embed from './plugins/Embed';
import SideIcon from './plugins/Toolbar/SideIcon';
export default [
	Math(),
	Code(),
	SideIcon(),
	MarkDownShortcuts(),
	KeyboardShortcuts(),
	OnKeyDown(),
	MarkDownPaste(),
	HOC({ plugins: [ HoverMenu ] }),
	Image({
		extensions: [ 'png', 'jpeg', 'jpg' ],
		insertImage: (editor, src) => {
			editor.insertImageFile(src);
		}
	}),
	Embed()
];
