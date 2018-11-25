import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'app/components';
import { CURRENCIES } from 'app/types';

@connect((state) => {
	return {
		summary: state.summary,
	};
})
export default class Summary extends React.PureComponent {

	hide = () => {
		this.props.dispatch({
			type: 'SUMMARY_HIDE',
		});
	}

	renderSymbol = (cur) => {
		return CURRENCIES[cur] || '';
	}

	render() {
		const {
			summary,
		} = this.props;

		const hiddenClass = !summary.show ? 'hidden' : '';

		return (
			<div className={`summary ${hiddenClass}`}>
				<div className="summary-info-wrapper">
					<div className="complete-icon">
						<i className="ion-checkmark" />
					</div>
					<p className="info">You exchanged {this.renderSymbol(summary.fromCur)}{summary.fromVal.toFixed(2)} <i className="ion-android-arrow-forward" /> {this.renderSymbol(summary.toCur)}{summary.toVal.toFixed(2)}</p>
				</div>
				<div className="btn-wrapper">
					<Button onClick={this.hide}>Done</Button>
				</div>
			</div>
		);
	}

}
