import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.PureComponent {

	static propTypes = {
		children: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
		onClick: PropTypes.func.isRequired,
	}

	static defaultProps = {
		disabled: false,
	}

	render() {
		const {
			children,
			disabled,
			onClick,
		} = this.props;

		const disabledClass = disabled ? 'disabled' : '';

		return (
			<button
				type="button"
				className={`btn ${disabledClass}`}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}

}
