import React, { useState, useEffect, useRef } from "react";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import SwiperCore, { Autoplay } from "swiper";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import "./hero-slide.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icon star
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";
import Loading from "../loading/Loading";

const HeroSlider = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);

	SwiperCore.use([Autoplay]);
	// const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const params = { page: 1 };
			// try catch block
			try {
				const response = await tmdbApi.getMoviesList(
					movieType.popular,
					{ params }
				);
				setMovies(response.results.slice(1, 6));
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className="hero-slide">
				<Swiper
					modules={[Autoplay]}
					grabCursor={true}
					spaceBetween={0}
					slidesPerView={1}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					speed={1000}>
					{movies.map((item, i) => (
						<SwiperSlide key={i}>
							{({ isActive }) => (
								<HeroSlideItem
									item={item}
									className={`${isActive ? "active" : ""}`}
								/>
							)}
						</SwiperSlide>
					))}
				</Swiper>
				{movies.map((item, i) => (
					<TrailerModal key={i} item={item} />
				))}
			</div>
		);
	}
};

const HeroSlideItem = (props) => {
	let navigate = useNavigate();

	const item = props.item;

	const background = apiConfig.originalImage(
		item.backdrop_path ? item.backdrop_path : item.poster_path
	);

	const setModalActive = async () => {
		const modal = document.querySelector(`#modal_${item.id}`);

		const videos = await tmdbApi.getVideos(category.movie, item.id);

		if (videos.results.length > 0) {
			const videSrc =
				"https://www.youtube.com/embed/" +
				videos.results[0].key +
				"?autoplay=1";
			modal
				.querySelector(".modal__content > iframe")
				.setAttribute("src", videSrc);
		} else {
			modal.querySelector(".modal__content").innerHTML = "No trailer";
		}
		modal.classList.toggle("active");
	};

	return (
		<div
			className={`hero-slide__item ${props.className}`}
			style={{ backgroundImage: `url(${background})` }}>
			<div className="hero-slide__item__content container">
				<div className="hero-slide__item__content__info">
					<h2 className="title">{item.title}</h2>
					<div className="overview">{item.overview}</div>
					{/* vote_average */}
					<div className="votes">
						<div className="vote">
							{/* vote card icon */}
							<div className="vote__icon average">
								<FontAwesomeIcon icon={faStar} />
							</div>
							{/* vote card text */}
							<div className="vote__average">
								<label>Vote average</label>
								<h3>
									<span className="vote__average__number">
										{item.vote_average}
									</span>
									<span className="vote__average__text">
										/10
									</span>
								</h3>
							</div>
						</div>
						<div className="vote">
							{/* vote card icon */}
							<div className="vote__icon user">
								<FontAwesomeIcon icon={faUser} />
							</div>
							{/* vote card text */}
							<div className="vote__average">
								<label>Vote count</label>
								<h3>
									<span className="vote__average__number">
										{item.vote_count}
									</span>
								</h3>
							</div>
						</div>
					</div>
					<div className="btns">
						<Button onClick={() => navigate("/movie/" + item.id)}>
							Watch now
						</Button>
						<OutlineButton onClick={setModalActive}>
							Watch trailer
						</OutlineButton>
					</div>
				</div>
				<div className="hero-slide__item__content__poster">
					<img src={apiConfig.w500Image(item.poster_path)} alt="" />
				</div>
			</div>
		</div>
	);
};

export const TrailerModal = (props) => {
	const item = props.item;

	const iframeRef = useRef(null);

	const onClose = () => iframeRef.current.setAttribute("src", "");

	return (
		<Modal active={false} id={`modal_${item.id}`}>
			<ModalContent onClose={onClose}>
				<iframe
					ref={iframeRef}
					width="100%"
					height="500px"
					title="trailer"></iframe>
			</ModalContent>
		</Modal>
	);
};

export default HeroSlider;
