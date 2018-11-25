import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from 'app/store';
import { fetchRates } from 'app/actions';
import { GBP, USD } from 'app/types';
import View from '../View';

describe('Exchange.View', () => {

	let wrapper;
	let instance;

	beforeEach(() => {
		wrapper = shallow(<View store={store} />).dive();
		instance = wrapper.instance();
	});

	it('renders correctly', () => {
		const tree = renderer.create(<Provider store={store}><View /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('fetches rates', async () => {
		const prevRate = store.getState().rate.value;
		await store.dispatch(fetchRates(USD, GBP));
		const newRate = store.getState().rate.value;
		expect(newRate).not.toBe(prevRate);
	});

	it('swaps the currency pair on clicking swap', () => {
		const { from, to } = instance.state;
		instance.swap();
		expect(instance.state.to).toEqual(from);
		expect(instance.state.from).toEqual(to);
	});

	it('highlights the balance if balance is less than the requested amount', () => {
		instance.handleInputChange(10000, 'from');
		expect(wrapper.find({ testID: 'ExchangeBoxFrom' }).shallow().find('.exchange-item')
			.hasClass('insufficient')).toBe(true);
	});

	it('blocks the button if balance is less than the requested amount', () => {
		instance.handleInputChange(10000, 'from');
		expect(wrapper.find({ testID: 'ExchangeButton' }).prop('disabled')).toBe(true);
	});

	it('blocks the button if amount is 0', () => {
		instance.handleInputChange(0, 'from');

		expect(wrapper.find({ testID: 'ExchangeButton' }).prop('disabled')).toBe(true);
	});

});
