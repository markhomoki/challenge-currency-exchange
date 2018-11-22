import React from 'react';
import renderer from 'react-test-renderer';
import DigitInput from '../DigitInput';

describe('DigitInput', () => {
	let wrapper;
	const element = (
		<DigitInput direction="from" />
	);

	beforeEach(() => {
		wrapper = mount(element);
	});

	it('renders correctly', () => {
		const tree = renderer.create(element).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('doesn\'t accept letter', () => {
		wrapper.instance().handleChange({ target: { value: 'Hello World' } });
		expect(wrapper.state().value).toEqual('');
	});

	it('doesn\'t accept leading 0', () => {
		wrapper.instance().handleChange({ target: { value: '0' } });
		expect(wrapper.state().value).toEqual('');
	});
});
