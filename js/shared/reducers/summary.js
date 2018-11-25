const defaultState = {
	show: false,
	fromCur: undefined,
	toCur: undefined,
	fromVal: 0,
	toVal: 0,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case 'SUMMARY_SHOW':
			const { fromCur, toCur, fromVal, toVal } = action.payload;

			return {
				show: true,
				fromCur,
				toCur,
				fromVal,
				toVal,
			};
		case 'SUMMARY_HIDE':
			return {
				...state,
				show: false,
			};
		default:
			return state;
	}
}
