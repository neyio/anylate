import EmbedComponent from './components/EmbedComponent';
import WrapperBlock from './components/WrapperBlock';
import LastChildAvailable from './components/LastChildAvailable';
import HoverMenu from './components/HoverMenu/index';

import MarkdownSupport from './components/Markdown/MarkdownSupport';

export default [WrapperBlock(), MarkdownSupport(), EmbedComponent(), LastChildAvailable(), HoverMenu()];
