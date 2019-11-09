import marked from 'marked';

// 考虑到webwork的异步特性，为了不产生对编辑器插件产生结构性破坏，暂时注释
// import workerMaster from './WorkerMaster';
// if (Worker) {
//     return (async (md, opts) => await workerMaster(md, { ...opts }))(md, options);
// }
export const markDownToLexer = md => {
	console.log('markDownToLexer is used');
	return marked.lexer(md);
};

export const closureWrapper = action => {
	return () => action();
};

// if (bool&&action) return action , else return defaultAction;
// export const when = (bool, action, defaultAction = null) => {
// 	return (bool && action) || defaultAction;
// };

export const when = (bool, action) => next => () => {
	return (bool && action()) || next();
};
export const whenTrueOrNext = action => next => () => {
	return action() || next();
};
export const noop = () => {};
export const chain = (...conditions) => conditions.reduceRight((acc, condition) => condition(acc), noop);

/**
 * 示例，用于流程控制
 */
// const t = (text, isPass = false) => () => {
// 	console.log(text);
// 	return isPass;
// };
// const flow = chain(
// 	when(true, t('hhhh')),
// 	when(true, t('ssss')),
// 	when(true, t('jjjj')),
// 	when(true, t('rrrr')),
// 	when(true, t('llll'))
// );
