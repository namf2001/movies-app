import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input.jsx";
import MovieCard from "../movie-card/MovieCard";
import { ModalDetail } from "../movie-list/MovieList";
// import MovieSearch from "../movie-search/MovieSearch";
// import scss
import "./movie-gird.scss";

const MovieGird = (props) => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	const { keyword } = useParams();

	useEffect(() => {
		const getList = async () => {
			let response = null;
			if (keyword === undefined) {
				const params = {};
				switch (props.category) {
					case category.movie:
						response = await tmdbApi.getMoviesList(
							movieType.upcoming,
							{ params }
						);
						break;
					default:
						response = await tmdbApi.getTvList(tvType.popular, {
							params,
						});
				}
			} else {
				const params = {
					query: keyword,
				};
				response = await tmdbApi.search(props.category, { params });
			}
			setItems(response.results);
			setTotalPage(response.total_pages);
		};
		getList();
	}, [props.category, keyword]);

	// load more
	const loadMore = async () => {
		const params = {
			page: page + 1,
		};
		let response = null;
		if (keyword === undefined) {
			switch (props.category) {
				case category.movie:
					response = await tmdbApi.getMoviesList(movieType.upcoming, {
						params,
					});
					break;
				default:
					response = await tmdbApi.getTvList(tvType.popular, {
						params,
					});
			}
		} else {
			const params = {
				query: keyword,
				page: page + 1,
			};
			response = await tmdbApi.search(props.category, { params });
		}
		setItems([...items, ...response.results]);
		setPage(page + 1);
	};

	return (
		<>
			<div className="section mb-3">
				<MovieSearch category={props.category} keyword={keyword} />
			</div>
			<div className="movie-grid">
				{items.map((item, i) => (
					<MovieCard category={props.category} item={item} key={i} />
				))}
			</div>
			{page < totalPage ? (
				<div className="movie-grid__loadmore">
					<OutlineButton className="small" onClick={loadMore}>
						Load more
					</OutlineButton>
				</div>
			) : null}
			{items.map((item, i) => (	
				<ModalDetail key={i} item={item} category={props.category} />
			))}
		</>
	);
};

const MovieSearch = (props) => {
	// use navigate to search page
	let navigate = useNavigate();

	const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

	const goToSearch = useCallback(() => {
		if (keyword.trim().length > 0) {
			navigate(`/${category[props.category]}/search/${keyword}`);
		}
	}, [keyword, props.category, navigate]);

	useEffect(() => {
		const enterEvent = (e) => {
			e.preventDefault();
			if (e.keyCode === 13) {
				goToSearch();
			}
		};
		document.addEventListener("keyup", enterEvent);
		return () => {
			document.removeEventListener("keyup", enterEvent);
		};
	}, [keyword, goToSearch]);

	return (
		<div className="movie-search">
			<Input
				type="text"
				placeholder="Enter keyword"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<Button className="small" onClick={goToSearch}>
				Search
			</Button>
		</div>
	);
};

export default MovieGird;
