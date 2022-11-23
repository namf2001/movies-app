import React, { useEffect, useState } from "react";
import "./App.scss";
import "swiper/swiper.min.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import NotFound from "./pages/NotFound.jsx";
import Intro from "./components/into/Intro";
import VoidControlled from "./components/void-controlled/VoidControlled";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Account from "./components/account/Account";
import LoginSigup from "./pages/auth/login-signup/LoginSignup";

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	}, []);

	// if (loading) {
	// 	return <Intro />;
	// } else {
	return (
		<AuthContextProvider>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/:category/search/:keyword"
					element={<Catalog />}
				/>
				<Route path="/:category/:id" element={<Detail />} />
				<Route path="/:category" element={<Catalog />} />
				<Route path="/connect/:param" element={<LoginSigup />} />
				<Route
					path="/account"
					element={
						<ProtectedRoute>
							<Account />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
			<VoidControlled />
		</AuthContextProvider>
	);
	// }
}

export default App;
