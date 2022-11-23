import "./header.scss";
import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import headerNav from "../../assets/data/headerNav";
import logo from "../../assets/image/logo-app.png";
import { UserAuth } from "../../context/AuthContext";
import Button, { OutlineButton } from "../button/Button";

const Header = () => {
	const [activeauth, setActiveauth] = useState(false);
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();
	console.log(user);
	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	const handleActiveAuth = () => {
		setActiveauth(!activeauth);
	};
	// =====================end of auth========================//
	const { pathname } = useLocation();
	const headerRef = useRef(null);
	let active = headerNav.find((item) => item.path === pathname);
	if (active === undefined) {
		active = "undefined";
	}
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
					<Link to="/">FLMovies</Link>
				</div>
				<nav className="header__nav">
					<ul className="header__list">
						{headerNav.map((item, index) => (
							<li
								key={index}
								className={
									item.path === active.path
										? "header__list-item active"
										: "header__list-item"
								}>
								<Link to={item.path}>{item.display}</Link>
							</li>
						))}
					</ul>
				</nav>
				{user?.email ? (
					<div>
						<div className="auth-dropdown">
							<div className="auth-dropdown__btn">
								<span
									className="auth-dropdown__name"
									onClick={handleActiveAuth}>
									{user.email.slice(0, 1).toUpperCase()}
								</span>
							</div>
							<ul
								className={`
								auth-dropdown__list ${activeauth ? "active" : ""}
							`}>
								<li className="auth-dropdown__item">
									<Link to="/account">My Show</Link>
								</li>
								<li className="auth-dropdown__item ">
									<button
										onClick={handleLogout}
										className="auth-dropdown__item-btn">
										Logout
									</button>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<div>
						<Button className="small">
							<Link to="connect/login">LogIn</Link>
						</Button>
						{" "}
						<OutlineButton className="small">
							<Link to="connect/signup">SignUp</Link>
						</OutlineButton>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
