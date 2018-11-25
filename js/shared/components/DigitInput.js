import React from 'react';
import PropTypes from 'prop-types';

export default class DigitInput extends React.PureComponent {

	static propTypes = {
		direction: PropTypes.oneOf(['from', 'to']).isRequired,
		onInputChange: PropTypes.func,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
	}

	static defaultProps = {
		value: '',
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		if (nextProps.value != prevState.value) {
			const newValue = nextProps.value ? nextProps.value.toString() : '';
			return { value: newValue };
		}

		return false;
	}

	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
		};
	}

	handleChange = (e) => {
		const { value } = e.target;
		const formattedValue = value.replace(/\+|-/g, '');

		const matchedValue = formattedValue.match(/[0-9]+(\.?)([0-9][0-9]?)?/);

		if (formattedValue && !matchedValue) {
			return;
		}

		let newValue = matchedValue ? matchedValue[0] : formattedValue;

		// check if has multiple leading 0s
		if (newValue.match(/^0{2,}/)) {
			return;
		}

		const hasDecimal = newValue.indexOf('.') !== -1;

		// check if value doesn't have decimal and starts with 0 + number
		if (!hasDecimal && newValue.length > 1 && newValue.match(/^0+/)) {
			newValue = newValue.replace(/^0+/g, '');
		}

		const maxLength = hasDecimal ? 16 : 15;

		// check if length exceeds the maxLength
		if (newValue.length > maxLength) {
			return;
		}

		this.updateValue(newValue);
	}

	updateValue = (value) => {
		const { onInputChange } = this.props;
		const floatedValue = value ? parseFloat(value) : 0;

		this.setState({ value });

		if (onInputChange) {
			onInputChange(floatedValue, this.props.direction);
		}
	}

	render() {
		const {
			direction,
		} = this.props;

		const {
			value,
		} = this.state;

		const prefix = direction === 'from' ? '-' : '+';
		const formattedValue = value.length > 0 ? `${prefix}${value}` : '';

		return (
			<div className="digit-input-wrapper">
				<input
					type="text"
					className="digit-input"
					onChange={this.handleChange}
					value={formattedValue}
					placeholder="0"
				/>
			</div>
		);
	}

}
