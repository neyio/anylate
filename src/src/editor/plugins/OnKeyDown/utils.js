export const whenTrueOrNext = (action) => (next) => () => {
	return action() || next();
};
export const noop = () => {};
export const chain = (...conditions) => conditions.reduceRight((acc, condition) => condition(acc), noop);

export const isModKey = (event) => {
	const inIOS = typeof window !== 'undefined' && /Mac|iPad|iPod|iPhone/.test(window.navigator.platform);
	return inIOS ? event.metaKey : event.ctrlKey;
};
