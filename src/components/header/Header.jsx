import "./header.scss";
import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import headerNav from "../../assets/data/headerNav";
import logo from "../../assets/image/logo-app.png";

const Header = () => {
	const { pathname } = useLocation();
	const headerRef = useRef(null);
	const active = headerNav.find((item) => item.path === pathname);

	useEffect(() => {
		const shrinkHeader = () => {
			if (
				document.body.scrollTop > 50 ||
				document.documentElement.scrollTop > 50
			) {
				headerRef.current.classList.add("shrink");
			} else {
				headerRef.current.classList.remove("shrink");
			}
		};
		window.addEventListener("scroll", shrinkHeader);
		return () => {
			window.removeEventListener("scroll", shrinkHeader);
		};
	}, []);

	return (
		<header ref={headerRef} className="header">
			<div className="container header__wrap">
				<div className="logo">
					<img src={logo} alt="logo" />
					<Link to="/">FLnam Movies</Link>
				</div>
				<nav className="header__nav">
					<ul className="header__list">
						{headerNav.map((item, index) => (
							<li key={index} className="header__item">
								<Link
									to={item.path}
									className={
										item.path === active.path
											? "active"
											: ""
									}>
									{item.display}
								</Link>
							</li>
						))} 
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
