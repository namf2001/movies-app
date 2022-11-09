import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// scss
import "./movie-list.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Button
// import Button, { OutlineButton } from "../button/Button";
// api
import tmdbApi, { category } from "../../api/tmdbApi";
// import apiConfig from "../../api/apiConfig";
// import { useNavigate } from "react-router-dom";
import MovieCard from "../movie-card/MovieCard";

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
				response = await tmdbApi.getSimilarMovies(props.id, { params });
			}
			setMovies(response.results);
		};
		fetchData();
	}, [props.category, props.type, props.id]);

	return (
		<div className="movie-list">
			<Swiper
				spaceBetween={10}
				slidesPerView={"auto"}
				grabCursor={true}
				freeMode={true}>
				{movies.map((item, i) => (
					<SwiperSlide key={i}>
						<MovieCard item={item} category={props.category} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

MovieList.propTypes = {
	category: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default MovieList;
