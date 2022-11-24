import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import "./Login.scss";
import bg from "../../../assets/image/bg-account.jpg";

const LoginSigup = () => {
	// useParam
	const { param } = useParams();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { logIn, signUp} = UserAuth();
	// console.log(user);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await logIn(email, password);
			navigate("/");
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			await signUp(email, password);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container login">
			<img className="login__bg" src={bg} alt="/" />
			<div className="login__overlay"></div>
			<div className="login__form">
				<div className="login__form--container">
					<div className="login__form--container--form">
						{/* <h1 className="login__form--title">Sign In</h1> */}
						{param === "signup" ? (
							<h1 className="login__form--title">Sign Up</h1>
						) : (
							<h1 className="login__form--title">Log In</h1>
						)}
						{error ? (
							<p className="login__form--error">{error}</p>
						) : null}
						<form onSubmit={
							param === "signup" ? handleSignup : handleLogin
						} className="form">
							<input
								onChange={(e) => setEmail(e.target.value)}
								className="login__form--input"
								type="email"
								placeholder="Email"
								autoComplete="email"
							/>
							<input
								onChange={(e) => setPassword(e.target.value)}
								className="login__form--input"
								type="password"
								placeholder="Password"
								autoComplete="current-password"
							/>
							<button className="login__form--btn">
								{param === "signup" ? "Sign Up" : "LogIn"}
							</button>
							<div className="login__form--forgot">
								<p>
									<input type="checkbox" />
									Remember me
								</p>
								<p> Need Help?</p>
							</div>
							<p className="login__form--create">
								<span>New to Netflix?</span>{" "}
								{param === "signup" ? (
									<Link to="/login">Sign In now.</Link>
								) : (
									<Link to="/signup">Sign up now.</Link>
								)}
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginSigup;
