const flow = (...conditionActions) => (...props) => {
	for (const [ condition, action ] of conditionActions) {
		if (condition(...props)) return action(...props);
	}
};

export default flow;
