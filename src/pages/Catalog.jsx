import React from 'react'
import { useParams } from 'react-router-dom';
import PageHeader from '../components/page-header/PageHeader';
import { category as cate } from '../api/tmdbApi';
import MovieGird from '../components/movie-gird/MovieGird';

const Catalog = () => {
    const { category } = useParams();
    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Series'}
            </PageHeader>
            <MovieGird category={category} />
        </>
    )
}

export default Catalog