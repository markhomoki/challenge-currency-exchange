import api from 'app/utils/api';

export const exchangeMoney = (fromCur, toCur, fromVal, toVal) => {
	return {
		type: 'WALLET_EXCHANGE_MONEY',
		payload: {
			fromCur,
			toCur,
			fromVal,
			toVal,
		},
	};
};

// Custom Thunk Middleware
export const rejectData = (payload, res) => {
	return {
		type: `${payload.type}_REJECTED`,
		payload: res,
	};
};

export const requestData = (payload) => {
	return {
		type: `${payload.type}_PENDING`,
	};
};

export const receiveData = (payload, res) => {
	return {
		payload: res,
		type: `${payload.type}_FULFILLED`,
	};
};

export const fetchData = payload => (dispatch) => {
	dispatch(requestData(payload));
	return api.get(payload.url)
		.then((res) => {
			if (res.status !== 200) {
				console.log('err', res);
				return;
			}
			dispatch(receiveData(payload, res));
		});
};

export const fetchRates = (fromCurrency, toCurrency) => {
	return fetchData({
		type: 'RATE',
		url: `/latest?base=${fromCurrency}&symbols=${toCurrency}`,
	});
};
