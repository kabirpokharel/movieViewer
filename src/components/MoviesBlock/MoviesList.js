import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styledComponents from 'styled-components';
import { GlobalContext } from '../../context/provider';
import { colors } from '../../constants/styleConstants';
import MovieCard from '../MovieCard/MovieCard';
import { BodyText } from '../Fonts/font';
import { SET_CURRENT_MOVIE, UPDATE_QUERY_DETAILS } from '../../constants/actionConstants';
import loadMovieDetails from '../../context/actions/loadSelectedMovie';
import isEmpty from '../../helpers/isEmpty';
import loadMovieList from '../../context/actions/loadMovieList';

const MoviesList = ({ movieList }) => {
  const {
    movieListContext: { movieListDispatch, movieListState }
  } = useContext(GlobalContext);
  const { Search: movies, totalResults } = movieList;

  const handleScrollEvent = (e) => {
    let endList = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (endList) {
      const newPageNumber = movieListState.searchParams.pageNumber + 1;
      console.log('newPagenumber MovieList -- ->', newPageNumber);
      movieListDispatch({
        type: UPDATE_QUERY_DETAILS,
        payload: { ...movieListState.searchParams, pageNumber: newPageNumber }
      });
      loadMovieList(movieListDispatch, movieListState, {
        ...movieListState.searchParams,
        pageNumber: newPageNumber
      });
    }
    console.log('see this is end list', endList);
  };

  const MovieListDisplay = () => {
    console.log('see this is movieList on movieList page -- --- ->', movieList);

    if (isEmpty(movies) && movieList.Error) {
      return <div>{movieList.Error}</div>;
    }
    return movies.map((movie) => (
      <MovieCard
        movieCardClicked={() => loadMovieDetails(movie.imdbID)(movieListDispatch)}
        key={movie.imdbID}
        {...{ movie }}
      />
    ));
  };

  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem', display: 'flex', justifyContent: 'space-between' }}>
        <BodyText sm={true}>{totalResults} RESULTS</BodyText>
        <BodyText sm={true}>{movies.length} SEEN</BodyText>
      </div>
      <div
        onScroll={handleScrollEvent}
        style={{
          height: 'calc(100vh - 93px - 4rem)',
          borderRight: `1px solid ${colors.GREY_COLOR_2}`,
          overflowX: 'auto'
        }}>
        <MovieListDisplay />
      </div>
    </>
  );
};
MoviesList.propTypes = {
  movies: PropTypes.array
};

export default MoviesList;
