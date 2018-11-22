import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CURRENCIES, EUR, GBP, USD } from 'app/types';
import DigitInput from './DigitInput';

export default class ExchangeBox extends React.PureComponent {

	static propTypes = {
		balance: PropTypes.number.isRequired,
		className: PropTypes.string,
		currency: PropTypes.oneOf([EUR, GBP, USD]).isRequired,
	}

	static defaultProps = {
		className: '',
	}

	handleCurrencyChange = (e) => {
		this.props.onCurrencyChange(e.currentTarget.value, this.props.direction);
	}

	renderSymbol = () => {
		return CURRENCIES[this.props.currency] || '';
	}

	render() {
		const {
			balance,
			className,
			currency,
			onCurrencyChange,
			...rest
		} = this.props;

		return (
			<div className={`exchange-item ${className}`}>
				<div className="amount-wrapper">
					<div className="currency-wrapper">
						<select className="currency-select" onChange={this.handleCurrencyChange} value={currency}>
							{_.map(CURRENCIES, (val, cur) => <option key={cur} value={cur}>{cur}</option>)}
						</select>
						<i className="ion-chevron-down" />
					</div>
					<DigitInput {...rest} />
				</div>
				<span className="balance">Balance: {this.renderSymbol()}{balance}</span>
			</div>
		);
	}

}
