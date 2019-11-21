import renderBlock from './renderBlock';
import renderMark from './renderMark';
import renderInline from './renderInline';
import schema from './schema';
export default function AnyLateRender() {
	return {
		renderBlock,
		renderMark,
		renderInline,
		schema
	};
}
