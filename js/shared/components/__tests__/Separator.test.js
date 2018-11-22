import React from 'react';
import renderer from 'react-test-renderer';
import { GBP, USD } from 'app/types';
import Separator from '../Separator';

describe('Separator', () => {
	let wrapper;
	const element = (
		<Separator
			fromCurrency={USD}
			onSwap={() => {}}
			rate={1.2}
			toCurrency={GBP}
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
