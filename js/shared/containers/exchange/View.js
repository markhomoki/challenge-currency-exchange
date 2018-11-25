import * as React from 'react';
import { connect } from 'react-redux';
import { exchangeMoney, fetchRates } from 'app/actions';
import { Button, ExchangeBox, Separator } from 'app/components';
import { GBP, USD } from 'app/types';
import Summary from './Summary';

@connect((state) => {
	return {
		rate: state.rate,
		wallet: state.wallet,
	};
})
export default class View extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			from: {
				currency: USD,
				value: '',
			},
			to: {
				currency: GBP,
				value: '',
			},
		};
	}

	componentDidMount() {
		this.fetchData();
		setInterval(this.fetchData, 10000);
	}

	fetchData = () => {
		const { from, to } = this.state;

		this.props.dispatch(fetchRates(from.currency, to.currency));
	}

	exchange = () => {
		const { from, to } = this.state;
		const fromCur = from.currency;
		const toCur = to.currency;
		const fromVal = from.value;
		const toVal = to.value;

		// exchange and update redux store
		this.props.dispatch(exchangeMoney(fromCur, toCur, fromVal, toVal));

		// reset input values to 0
		this.handleInputChange(0, 'from');

		// show summary screen
		this.props.dispatch({
			type: 'SUMMARY_SHOW',
			payload: {
				fromCur,
				toCur,
				fromVal,
				toVal,
			},
		});
	}

	convert = (value, direction) => {

		const { rate } = this.props;

		if (!value) {
			return 0;
		}

		const formattedValue = parseFloat(value);
		const pairValue = direction === 'from' ? formattedValue * rate.value : formattedValue / rate.value;

		return parseFloat(pairValue.toFixed(2));
	}

	swap = () => {
		this.setState((prevState) => {
			return {
				from: prevState.to,
				to: prevState.from,
			};
		}, this.fetchData);
	}

	handleInputChange = (value, direction) => {
		const isFrom = direction === 'from';
		const pairValue = this.convert(value, direction);

		const fromValue = isFrom ? value : pairValue;
		const toValue = !isFrom ? value : pairValue;

		this.setState((prevState) => {
			return {
				from: {
					...prevState.from,
					value: fromValue,
				},
				to: {
					...prevState.to,
					value: toValue,
				},
			};
		});
	}

	handleCurrencyChange = (currency, direction) => {
		const otherDir = direction === 'from' ? 'to' : 'from';

		// if matches with the pair currency then swap them
		if (this.state[otherDir].currency === currency) {
			this.swap();
			return;
		}

		this.setState((prevState) => {
			return {
				[direction]: {
					...prevState[direction],
					currency,
				},
			};
		}, this.fetchData);
	}

	render() {
		const {
			rate,
			wallet,
		} = this.props;

		const {
			from,
			to,
		} = this.state;

		const isInsufficient = wallet[from.currency] < from.value;
		const showMinAmount = !!(from.value && from.value < 0.10);
		const btnDisabled = !from.value || isInsufficient || showMinAmount;
		const insufficientClass = isInsufficient ? 'insufficient' : '';

		return (
			<div className="site-inner">
				<div className="exchange">
					<Summary />
					<div className="exchange-header">
						<i className="ion-close" />
						<h1 className="page-title">Exchange</h1>
						<i className="ion-help-circled" />
					</div>
					<ExchangeBox
						{...from}
						balance={wallet[from.currency]}
						className={`first ${insufficientClass}`}
						direction="from"
						onCurrencyChange={this.handleCurrencyChange}
						onInputChange={this.handleInputChange}
						showMinAmount={showMinAmount}
						testID="ExchangeBoxFrom"
					/>
					<Separator
						fromCurrency={from.currency}
						onSwap={this.swap}
						rate={rate.value}
						toCurrency={to.currency}
					/>
					<ExchangeBox
						{...to}
						balance={wallet[to.currency]}
						className="alt"
						direction="to"
						onCurrencyChange={this.handleCurrencyChange}
						onInputChange={this.handleInputChange}
					/>
					<div className="btn-wrapper">
						<Button testID="ExchangeButton" onClick={this.exchange} disabled={btnDisabled}>Exchange</Button>
					</div>
				</div>
			</div>
		);
	}

}
