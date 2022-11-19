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
			],
			callback: (redirectPage) => setRedirectUrl(redirectPage),
		},
	];

	const { transcript } = useSpeechRecognition({ commands });
    
	useEffect(() => {
        const pages = ["home", "movie", "tv", "tivi"];
        const urls = {
            home: "/",
            movie: "/movie",
            tv: "/tv",
            tivi: "/tv",
        };
        setTimeout(() => {
            if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
                return null;
            }
            if (redirectUrl) {
                console.log(redirectUrl);
                if (pages.includes(redirectUrl.toLocaleLowerCase())) {
                    setRedirect(<Navigate to={urls[redirectUrl]} replace/>);
                } else {
                    setRedirect(<Navigate to={`movie/search/${redirectUrl.toLowerCase()}`} replace/>);
                }
            }
        }, 1000);

        return () => {
            setRedirectUrl("");
            setRedirect("");
        };
    }, [redirectUrl]);

	return (
		<div id="bot-ai">
			{redirect}
			<p>{transcript}</p>
			<button onClick={SpeechRecognition.startListening}>
				<div className="bot-ai__icon"></div>
			</button>
		</div>
	);
};

export default VoidControlled;
