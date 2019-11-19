// import EmbedComponent from './components-d/EmbedComponent';
// import WrapperBlock from './components-d/WrapperBlock';
// import LastChildAvailable from './components-d/LastChildAvailable';
// import HoverMenu from './components-d/HoverMenu/index';

// import MarkdownSupport from './components-d/Markdown/MarkdownSupport';
// import createPlugin from '@zhujianshi/slate-code-base';
// import '@zhujianshi/slate-code-base/lib/index.css';
// export default [createPlugin(), WrapperBlock(), MarkdownSupport(), EmbedComponent(), LastChildAvailable(), HoverMenu()];
import MarkDownShortcuts from './plugins/MarkDownShortcuts';
import KeyboardShortcuts from './plugins/KeyboardShortcuts';
import OnKeyDown from './plugins/OnKeyDown';
import MarkDownPaste from './plugins/Paste/MarkDownPaste';
import HOC from './plugins/HOC/index';
import HoverMenu from './plugins/HOC/HoverMenu';
export default [
	MarkDownShortcuts(),
	KeyboardShortcuts(),
	OnKeyDown(),
	MarkDownPaste(),
	HOC({ plugins: [ HoverMenu ] })
];
