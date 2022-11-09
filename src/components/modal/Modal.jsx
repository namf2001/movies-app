import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./modal.scss";

const Modal = (props) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		setActive(props.active);
	}, [props.active]);

	return (
		<div id={props.id} className={`modal ${active ? "active" : ""}`}>
			{props.children}
		</div>
	);
};

Modal.propTypes = {
	active: PropTypes.bool,
	id: PropTypes.string,
};

export const ModalContent = (props) => {
	const contentRef = useRef(null);

	const closeModal = () => {
		contentRef.current.parentNode.classList.remove("active");
		if (props.onClose) props.onClose();
	};

	return (
		<div ref={contentRef} className="modal__content">
			{props.children}
			<div className="modal__content__close" onClick={closeModal}>
				<FontAwesomeIcon icon={faTimes} />
			</div>
		</div>
	);
};

ModalContent.propTypes = {
	onClose: PropTypes.func,
};

export default Modal;
