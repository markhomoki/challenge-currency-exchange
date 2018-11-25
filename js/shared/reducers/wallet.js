import { EUR, GBP, USD } from 'app/types';

const defaultState = {
	[EUR]: 106.98,
	[GBP]: 79.14,
	[USD]: 143.73,
};

export default function reducer(state = defaultState, action) {

	switch (action.type) {
		case 'WALLET_EXCHANGE_MONEY':
			const { fromCur, toCur, fromVal, toVal } = action.payload;
			return {
				...state,
				[fromCur]: parseFloat((state[fromCur] - fromVal).toFixed(2)),
				[toCur]: parseFloat((state[toCur] + toVal).toFixed(2)),
			};
		default:
			return state;
	}
}
