import React from 'react';
import renderer from 'react-test-renderer';
import { GBP, USD } from 'app/types';
import Separator from '../Separator';

describe('Separator', () => {
	const element = (
		<Separator
			fromCurrency={USD}
			onSwap={() => {}}
			rate={1.2}
			toCurrency={GBP}
		/>
	);

	it('renders correctly', () => {
		const tree = renderer.create(element).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
