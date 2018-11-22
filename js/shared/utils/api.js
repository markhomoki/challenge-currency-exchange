import axios from 'axios';

export default {

	// get sends a request to openweathermap with requested url and the added api key
	// then returns a promise
	get(url) {
		axios.defaults.baseURL = 'https://api.exchangeratesapi.io';

		return axios.get(url)
			.then(response => response).catch((error) => {
				if (error.response) {
					return error.response;
				}

				console.log('Error', error.message);
				return error.message;
			});
	},
};
