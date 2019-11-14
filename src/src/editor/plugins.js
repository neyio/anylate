// import EmbedComponent from './components-d/EmbedComponent';
// import WrapperBlock from './components-d/WrapperBlock';
// import LastChildAvailable from './components-d/LastChildAvailable';
// import HoverMenu from './components-d/HoverMenu/index';

// import MarkdownSupport from './components-d/Markdown/MarkdownSupport';
// import createPlugin from '@zhujianshi/slate-code-base';
// import '@zhujianshi/slate-code-base/lib/index.css';
// export default [createPlugin(), WrapperBlock(), MarkdownSupport(), EmbedComponent(), LastChildAvailable(), HoverMenu()];
import MarkDownShortcuts from "./plugins/MarkDownShortcuts";
export default [MarkDownShortcuts()];
