import { EUR, GBP, USD } from 'app/types';

const defaultState = {
	[EUR]: 106.98,
	[GBP]: 79.14,
	[USD]: 143.73,
};

export default function reducer(state = defaultState) {
	return state;
}
