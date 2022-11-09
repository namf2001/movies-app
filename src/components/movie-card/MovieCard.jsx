import React from "react";
// scss
import "./movie-card.scss";
// import Link
import { Link } from "react-router-dom";
//  button
import Button, { ActionButton } from "../button/Button";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import icons
import { faPlay, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
// api
// import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
	const item = props.item;

	const link = `/${props.category}/${item.id}`;

	const handleAddToWatchList = () => {
		console.log("Add to watch list");
	};

	const handleAddToFavorites = () => {
		console.log("Add to favorites");
	};

	const bg = apiConfig.w500Image(item.backdrop_path || item.poster_path);
	return (
		<Link to={link}>
			<div
				className="movie-card"
				style={{ backgroundImage: `url(${bg})` }}>
				<Button>
					<FontAwesomeIcon icon={faPlay} />
				</Button>
				<div className="movie-card__overlay">
					<div className="movie-card__overlay__content">
						<h3 className="movie-card__overlay__content__title">
							{item.title || item.name}
						</h3>
						<div className="movie-card__overlay__content__actions">
							<ActionButton onClick={handleAddToWatchList}>
								<FontAwesomeIcon icon={faPlus} />
							</ActionButton>
							<ActionButton onClick={handleAddToFavorites}>
								<FontAwesomeIcon icon={faHeart} />
							</ActionButton>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
