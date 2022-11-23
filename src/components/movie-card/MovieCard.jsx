import React, { useState } from "react";
import PropTypes from "prop-types";
// scss
import "./movie-card.scss";
//  button
import { ActionButton } from "../button/Button";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import icons
import { faBookmark, faPlus } from "@fortawesome/free-solid-svg-icons";

import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

// api
import apiConfig from "../../api/apiConfig";
import tmdbApi, { category } from "../../api/tmdbApi";
import { UserAuth } from "../../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../api/firebase/firebase";

const MovieCard = (props) => {
	const [like, setLike] = useState(false);
	// console.log(saved);
	const { user } = UserAuth();

	const movieID = doc(db, "users", `${user?.email}`);
	const setModalActive = async () => {
		const modal = document.querySelector(`#modal__detail-${item.id}`);
		const credits = await tmdbApi.credits(category.movie, item.id);

		modal.querySelector(".avatars").innerHTML = `
			${credits.cast
				.slice(0, 5)
				.map(
					(cast, i) => `
					<div class="cast" key="${i}">
						<img src="${apiConfig.w500Image(cast.profile_path)}" alt="${cast.name}" />
						<div class="cast__info">
							<h4>${cast.name}</h4>
							<p>${cast.character}</p>
						</div>
					</div>
				`
				)
				.join("")}
		`;
		modal.classList.toggle("active");
	};
	const item = props.item;

	const saveShow = async () => {
		if (user?.email) {
			setLike(!like);
			await updateDoc(movieID, {
				savedShows: arrayUnion({
					id: item.id,
					item: props.item,
					category: props.category,
				}),
			});
			console.log("saved");
		} else {
			alert("Please log in to save a movie");
		}
	};
	let bg = apiConfig.w500Image(item.backdrop_path);
	if (bg === "https://image.tmdb.org/t/p/w500/null") {
		bg = "https://source.unsplash.com/random/218x123";
	}
	return (
		<div className="movie-card">
			<img src={bg} alt={item.original_title} />
			{/* overplay */}
			<div className="movie-card__overplay">
				<div className="movie-card__overplay__content">
					<h2 className="title">
						{item.original_title || item.original_name}
					</h2>
					<div className="votes">
						<div className="vote">
							<div className="vote__icon">
								{like ? (
									<div
										onClick={
											props.onClick
												? () => props.onClick()
												: null
										}>
										<FontAwesomeIcon icon={faBookmark} />
									</div>
								) : (
									<div onClick={saveShow}>
										<FontAwesomeIcon
											icon={faBookmarkRegular}
										/>
									</div>
								)}
							</div>
							<div className="vote__average">
								<h3>
									{item.vote_average}
									<span>/10</span>
								</h3>
							</div>
							<ActionButton onClick={setModalActive}>
								<FontAwesomeIcon icon={faPlus} />
							</ActionButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

MovieCard.propTypes = {
	item: PropTypes.object,
	category: PropTypes.string,
	deleteShow: PropTypes.func,
};
export default MovieCard;
