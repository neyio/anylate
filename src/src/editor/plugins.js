import EmbedComponent from './components/EmbedComponent';
import WrapperBlock from './components/WrapperBlock';
import LastChildAvailable from './components/LastChildAvailable';
import HoverMenu from './components/HoverMenu/index';

import MarkdownSupport from './components/Markdown/MarkdownSupport';
import createPlugin from '@zhujianshi/slate-code-base';
import '@zhujianshi/slate-code-base/lib/index.css';
export default [createPlugin(), WrapperBlock(), MarkdownSupport(), EmbedComponent(), LastChildAvailable(), HoverMenu()];
