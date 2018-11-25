import React from 'react';
import PropTypes from 'prop-types';
import { CURRENCIES, EUR, GBP, USD } from 'app/types';

export default class Separator extends React.PureComponent {

	static propTypes = {
		fromCurrency: PropTypes.oneOf([EUR, GBP, USD]).isRequired,
		onSwap: PropTypes.func.isRequired,
		rate: PropTypes.number.isRequired,
		toCurrency: PropTypes.oneOf([EUR, GBP, USD]).isRequired,
	}

	renderSymbol = (currency) => {
		return CURRENCIES[currency] || '';
	}

	render() {
		const {
			fromCurrency,
			onSwap,
			rate,
			toCurrency,
		} = this.props;

		const fromSymbol = this.renderSymbol(fromCurrency);
		const toSymbol = this.renderSymbol(toCurrency);
		const pairValue = 1 * rate;

		return (
			<div className="separator">
				<button type="button" className="btn-exchange" onClick={onSwap}>
					<i className="ion-arrow-swap" />
				</button>
				<div className="rate-wrapper">
					<i className="ion-arrow-graph-up-right" />
					<span className="rate">{fromSymbol}1 = {toSymbol}{pairValue.toFixed(4)}</span>
				</div>
			</div>
		);
	}

}
