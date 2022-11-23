import React, { useEffect, useState } from "react";
// import scss
import "./account-list.scss";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../api/firebase/firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import MovieCard from "../movie-card/MovieCard";
import { ModalDetail } from "../movie-list/MovieList";

const AccountList = () => {
	const [movies, setMovies] = useState([]);
	const { user } = UserAuth();
	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setMovies(doc.data()?.savedShows);
		});
	}, [user?.email]);

	const movieRef = doc(db, "users", `${user?.email}`);
	console.log(movies);
	const deleteShow = async (passedID) => {
		try {
			const result = movies.filter((item) => item.id !== passedID);
			await updateDoc(movieRef, {
				savedShows: result,
			});
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};
	if (movies.length > 0) {
		return (
			<div>
				<div className="movie-grid">
					{movies.map((movie, i) => (
						<MovieCard
							category={movie.category}
							item={movie.item}
							key={i}
							onClick={() => deleteShow(movie.id)}
						/>
					))}
				</div>
				{movies.map((movie, i) => (
					<ModalDetail
						category={movie.category}
						item={movie.item}
						key={i}
					/>
				))}
			</div>
		);
	} else {
		return <div className="account-list">No shows saved</div>;
	}
};

export default AccountList;
