import React from 'react'
import { Link } from 'react-router-dom'
import { category, movieType } from '../api/tmdbApi'
import { OutlineButton } from '../components/button/Button'
import HeroSlider from '../components/hero-slide/HeroSlider'
import MovieList from '../components/movie-list/MovieList'

const Home = () => {
    return (
        <>
            <HeroSlider />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                    <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular}/>
                </div>
            </div>
        </>
    )
}

export default Home