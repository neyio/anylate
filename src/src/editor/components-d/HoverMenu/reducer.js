function reducer(state, action) {
	switch (action.type) {
		case 'visible':
			return { ...state, visible: true };
		case 'hidden':
			return { ...state, visible: false };
		default:
			return { ...state };
	}
}

export default reducer;
