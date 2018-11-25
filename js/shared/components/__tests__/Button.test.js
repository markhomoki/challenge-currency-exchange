import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';

describe('Button', () => {
	const element = (
		<Button onClick={() => {}}>Click here</Button>
	);

	it('renders correctly', () => {
		const tree = renderer.create(element).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('disables the button if disabled=true in props', () => {
		const wrapper = mount(<Button onClick={() => {}} disabled>Click here</Button>);

		expect(wrapper.prop('disabled')).toBe(true);
		expect(wrapper.find('button').hasClass('disabled')).toBe(true);
	});
});
