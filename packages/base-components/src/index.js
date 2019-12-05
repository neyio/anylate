import { theme } from '@anylate/themes';
import '@anylate/themes/lib/index.css';
import renderBlock from './renderBlock';
import renderInline from './renderInline';
import renderMark from './renderMark';
import schema from './schema';
import commands from './commands';
import queries from './queries';

export const themes = theme;

export default function slateBaseComponents(
	options = {
		upload: (blob, callback) => {
			console.log('请在options里实现upload，上传代码 (blob，callback)=>void');
			callback('error');
		}
	}
) {
	return {
		renderBlock: renderBlock(options),
		renderMark,
		renderInline,
		schema,
		commands,
		queries
	};
}
