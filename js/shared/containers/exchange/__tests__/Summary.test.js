import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from 'app/store';
import Summary from '../Summary';

describe('Exchange.Summary', () => {

	let wrapper;
	let instance;

	beforeEach(() => {
		wrapper = shallow(<Summary store={store} />).dive();
		instance = wrapper.instance();
	});

	it('renders correctly', () => {
		const tree = renderer.create(<Provider store={store}><Summary /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('only renders when summary.show is true', () => {
		const shouldShow = instance.props.summary.show;

		expect(wrapper.find('.summary').hasClass('hidden')).toBe(!shouldShow);
	});

});
