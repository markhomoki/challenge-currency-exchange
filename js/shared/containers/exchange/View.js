import * as React from 'react';
import { connect } from 'react-redux';
import { fetchRates } from 'app/actions';
import { ExchangeBox, Separator } from 'app/components';
import { GBP, USD } from 'app/types';

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
				value: 0,
				balance: props.wallet[USD],
			},
			to: {
				currency: GBP,
				value: 0,
				balance: props.wallet[GBP],
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

	exchange = (value, direction) => {

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
		const pairValue = this.exchange(value, direction);

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
					balance: this.props.wallet[currency],
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
		const disabledClass = (!from.value || isInsufficient) ? 'disabled' : '';
		const insufficientClass = isInsufficient ? 'insufficient' : '';

		return (
			<div className="site-inner">
				<div className="exchange">
					<div className="exchange-header">
						<i className="ion-close" />
						<h1 className="page-title">Exchange</h1>
						<i className="ion-help-circled" />
					</div>
					<ExchangeBox
						{...from}
						testID="ExchangeBoxFrom"
						className={`first ${insufficientClass}`}
						direction="from"
						onInputChange={this.handleInputChange}
						onCurrencyChange={this.handleCurrencyChange}
					/>
					<Separator
						fromCurrency={from.currency}
						onSwap={this.swap}
						rate={rate.value}
						toCurrency={to.currency}
					/>
					<ExchangeBox
						{...to}
						className="alt"
						direction="to"
						onInputChange={this.handleInputChange}
						onCurrencyChange={this.handleCurrencyChange}
					/>
					<div className="btn-wrapper">
						<button type="button" className={`btn ${disabledClass}`}>Exchange</button>
					</div>
				</div>
			</div>
		);
	}

}
