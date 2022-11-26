import React, { useState, useEffect } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import { Navigate } from "react-router-dom";
// import scss
import "./void-controlled.scss";

const VoidControlled = () => {
	const [redirectUrl, setRedirectUrl] = useState("");
	const [redirect, setRedirect] = useState("");

	const commands = [
		{
			command: [
				"Go to * page",
				"Go to *",
				"Open * page",
				"Open *",
				"tìm kiếm phim *",
				"đi tới trang *",
			],
			callback: (redirectPage) => setRedirectUrl(redirectPage),
		},
	];

	const { transcript } = useSpeechRecognition({ commands });

	console.log(transcript);
	const startListening = () => {
		SpeechRecognition.startListening({ continuous: true });
	}
		
	const stopListening = () => {
		SpeechRecognition.stopListening()
	};
	
	useEffect(() => {
		const pages = ["home", "movie", "tv", "tivi", "login", "sign", "đăng nhập", "đăng ký"];
		const urls = {
			home: "/",
			movie: "/movie",
			tv: "/tv",
			tivi: "/tv",
			"đăng nhập": "connect/login",
			"đăng ký": "connect/signup",
		};
		if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
			return null;
		}
		if (redirectUrl) {
			console.log(redirectUrl);
			if (pages.includes(redirectUrl.toLocaleLowerCase())) {
				setRedirect(<Navigate to={urls[redirectUrl]} replace />);
			} else {
				setRedirect(
					<Navigate
						to={`movie/search/${redirectUrl.toLowerCase()}`}
						replace
					/>
				);
			}
		}

		return () => {
			setRedirectUrl("");
			setRedirect("");
		};
	}, [redirectUrl]);

	return (
		<div id="bot-ai">
			{redirect}
			<div className="form">
				<input
					type="text"
					className="form__input"
					placeholder="Say anything..."
					readOnly
					value={transcript.slice(-15)}
				/>
			</div>
			<button
				onTouchStart={startListening}
				onMouseDown={startListening}
				onTouchEnd={stopListening}
				onMouseUp={stopListening}>
				<div className="bot-ai__icon"></div>
			</button>
		</div>
	);
};

export default VoidControlled;
