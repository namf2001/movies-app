import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// scss
import "./movie-list.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Button
import { IconButton, OutlineButton } from "../button/Button";
// api
import tmdbApi, { category } from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";
import Modal, { ModalContent } from "../modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import apiConfig from "../../api/apiConfig";


const MovieList = (props) => {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			let response = null;
			const params = {};

			if (props.type !== "similar") {
				switch (props.category) {
					case category.movie:
						response = await tmdbApi.getMoviesList(props.type, {
							params,
						});
						break;
					default:
						response = await tmdbApi.getTvList(props.type, {
							params,
						});
				}
			} else {
				response = await tmdbApi.similar(props.category, props.id);
			}
			setMovies(response.results);
		};
		fetchData();
	}, [props.category, props.type, props.id]);	
	return (
		<>
			<div className="section mb-3">
				<div className="section__header mb-2">
					<h2>{props.title}</h2>
					<Link to="/movie">
						<OutlineButton className="small">
							View more
						</OutlineButton>
					</Link>
				</div>
				<div className="movie-list">
					<Swiper
						spaceBetween={10}
						slidesPerView={"auto"}
						grabCursor={true}
						freeMode={true}>
						{movies.map((item, i) => (
							<SwiperSlide key={i}>
								<MovieCard 
									item={item}
									category={props.category}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
			{movies.map((item, i) => (
				<ModalDetail key={i} item={item} category={props.category} />
			))}
		</>
	);
};

MovieList.propTypes = {
	category: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

// modal detail
export const ModalDetail = (props) => {
	const { item, category } = props;
	const [detail, setDetail] = useState(null);
	const link = `/${props.category}/${item.id}`;
	useEffect(() => {
		const getDetail = async () => {
			const response = await tmdbApi.detail(category, item.id, {
				params: {},
			});
			setDetail(response);
		};
		getDetail();
	}, [category, item.id]);

	if (detail === null) {
		return <div className="loading"></div>;
	} else {
		return (
			<>
				{detail && (
					<Modal active={false} id={`modal__detail-${item.id}`}>
						<ModalContent>
							<div className="modal__movie-card">
								<div className="modal__container">
									<div className="modal__img">
										<img
											src={apiConfig.w500Image(
												detail.poster_path
											)}
											alt="cover"
											className="modal__cover"
										/>
									</div>
									<div className="hero" id={`id${item.id}`}>
										<style>
											{`
											#${`id${item.id}`}.hero::before {
												background: url(${apiConfig.w1280Image(
													detail.backdrop_path
												)}) no-repeat top center;
												background-size: cover;
											}
										`}
										</style>
										<div className="details">
											<div className="title1">
												{detail.title || detail.name}
												{/* lang */}
												<span className="lang">
													{detail.status}
												</span>
											</div>
											<div className="title2">
												{detail.tagline}
											</div>
											<span className="rating">
												<div className="rating__popularity">
													<FontAwesomeIcon
														icon={faThumbsUp}
													/>
													<span>
														{detail.popularity}
													</span>
												</div>
												<div className="rating__vote">
													<FontAwesomeIcon
														icon={faStar}
													/>
													<span>
														{detail.vote_average}
													</span>
												</div>
											</span>
										</div>
									</div>
									<div className="description">
										<div className="column1">
											{detail.genres.map((genre) => (
												<span
													className="tag"
													key={genre.id}>
													{genre.name}
												</span>
											))}
										</div>

										<div className="column2">
											<p>{detail.overview}</p>
											<div className="avatars"></div>
										</div>
									</div>
									{/* button play */}
									<div className="modal__button">
										<Link to={link}>
											<IconButton>
												<FontAwesomeIcon
													icon={faPlay}
													className="play"
												/>
											</IconButton>
										</Link>
									</div>
								</div>
							</div>
						</ModalContent>
					</Modal>
				)}
			</>
		);
	}
};

export default MovieList;
