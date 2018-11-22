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

		if (value.match(/[a-z]/i) || value === '0') {
			return;
		}

		this.updateValue(value);
	}

	updateValue = (value) => {
		const { onInputChange } = this.props;
		const formattedValue = value.replace(/\+|-/g, '');
		const floatedValue = formattedValue ? parseFloat(formattedValue) : 0;

		this.setState({ value: formattedValue });

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
