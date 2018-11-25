import React from 'react';
import renderer from 'react-test-renderer';
import { USD } from 'app/types';
import ExchangeBox from '../ExchangeBox';

describe('ExchangeBox', () => {
	const element = (
		<ExchangeBox
			balance={143.54}
			currency={USD}
			direction="from"
			onInputChange={() => {}}
		/>
	);

	it('renders correctly', () => {
		const tree = renderer.create(element).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('displays the min amount warning', () => {
		const wrapper = mount(<ExchangeBox
			balance={143.54}
			currency={USD}
			direction="from"
			onInputChange={() => {}}
			showMinAmount
		/>);

		expect(wrapper.exists('.min-amount')).toBe(true);
	});

});
