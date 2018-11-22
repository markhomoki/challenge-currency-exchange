import React from 'react';
import renderer from 'react-test-renderer';
import { USD } from 'app/types';
import ExchangeBox from '../ExchangeBox';

describe('ExchangeBox', () => {
	let wrapper;
	const element = (
		<ExchangeBox
			balance={143.54}
			currency={USD}
			direction="from"
			onInputChange={() => {}}
		/>
	);

	beforeEach(() => {
		wrapper = mount(element);
	});

	it('renders correctly', () => {
		const tree = renderer.create(element).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
