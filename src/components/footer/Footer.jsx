import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
// import frontawesome facebook icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import bg from "../../assets/image/bg.jpeg";
import logo from "../../assets/image/logo-app.png";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer__overlay">
				<img src={bg} alt="bg" className="footer__overlay--bg" />
			</div>
			<div className="footer__content container">
				<div className="footer__content__logo">
					<div className="logo">
						<img src={logo} alt="" />
						<Link to="/">FLMovie</Link>
					</div>
				</div>
				<div className="footer__content__menus">
					<div className="footer__content__menu">
						<Link to="/">Home</Link>
						<Link to="/">Contact us</Link>
						<Link to="/">Term of services</Link>
						<Link to="/">About us</Link>
					</div>
					<div className="footer__content__menu">
						{/* social icon */}
						<a
							href="https://www.facebook.com/profile.php?id=100026653520558"
							target="_blank"
							rel="noreferrer">
							<FontAwesomeIcon icon={faFacebook} />
							<span> - facebook</span>
						</a>
						<a
							href="https://www.instagram.com/fl_nam7230/"
							target="_blank"
							rel="noreferrer">
							<FontAwesomeIcon icon={faInstagram} />
							<span> - instagram</span>
						</a>
						<a
							href="https://github.com/namhoai2k1"
							target="_blank"
							rel="noreferrer">
							<FontAwesomeIcon icon={faGithub} />
							<span> - github</span>
						</a>
					</div>
					<div className="footer__content__menu">
						<Link to="/">Live</Link>
						<Link to="/">FAQ</Link>
						<Link to="/">Premium</Link>
						<Link to="/">Pravacy policy</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
