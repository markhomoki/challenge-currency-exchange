import _ from 'lodash';

const defaultState = {
	value: 0,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case 'RATE_FULFILLED':
			const { rates } = action.payload.data;

			return {
				value: parseFloat(rates[Object.keys(rates)[0]].toFixed(4)),
			};
		default:
			return state;
	}
}
