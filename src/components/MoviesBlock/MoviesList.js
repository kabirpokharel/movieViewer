import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styledComponents from 'styled-components';
import { GlobalContext } from '../../context/provider';
import { colors } from '../../constants/styleConstants';
import MovieCard from '../MovieCard/MovieCard';
import { BodyText } from '../Fonts/font';
import { SET_CURRENT_MOVIE } from '../../constants/actionConstants';

const movieSelected = (imdbID, dispatch) => {
  dispatch({ SET_CURRENT_MOVIE, imdbID });
};

const MoviesList = ({ movieList }) => {
  const {
    movieListContext: { movieListDispatch }
  } = useContext(GlobalContext);

  const { Search: movies, totalResults } = movieList;
  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem' }}>
        <BodyText sm={true}>{totalResults} RESULTS</BodyText>
      </div>
      <div style={{ height: 'calc(100vh - 93px - 4rem)', overflowX: 'auto' }}>
        {movies.map((movie) => (
          <MovieCard
            movieCardClicked={() => movieSelected(movie.imdbID, movieListDispatch)}
            key={movie.imdbID}
            {...{ movie }}
          />
        ))}
      </div>
    </>
  );
};
MoviesList.propTypes = {
  movies: PropTypes.array
};

export default MoviesList;
