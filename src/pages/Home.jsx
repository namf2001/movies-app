import { category, movieType, tvType } from "../api/tmdbApi";

import HeroSlider from "../components/hero-slide/HeroSlider";
import MovieList from "../components/movie-list/MovieList";

const Home = () => {
	return (
		<>
			<HeroSlider />
			<div className="container">
				<MovieList
					category={category.movie}
					type={movieType.popular}
					title={"Trending Movies"}
				/>
				<MovieList
					category={category.movie}
					type={movieType.top_rated}
					title={"Top Rated Movies"}
				/>
				<MovieList
					category={category.tv}
					type={tvType.popular}
					title={"Trending TV"}
				/>
				<MovieList
					category={category.tv}
					type={tvType.top_rated}
					title={"Top Rated TV"}
				/>
			</div>
		</>
	);
};

export default Home;
