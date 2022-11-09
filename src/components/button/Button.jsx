import React from "react";
import "./button.scss";

import PropTypes from "prop-types";

const Button = (props) => {
	return (
		<button
			className={`btn ${props.className}`}
			onClick={props.onClick ? () => props.onClick() : null}>
			{props.children}
		</button>
	);
};

export const OutlineButton = props => {
    return (
        <Button
            className={`btn-outline ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </Button>
    );
}

export const ActionButton = props => {
    return (
        <button
            className={`btn-action ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    );
}

ActionButton.propTypes = {
	onClick: PropTypes.func,
};

Button.propTypes = {
	onClick: PropTypes.func,
};

export default Button;
