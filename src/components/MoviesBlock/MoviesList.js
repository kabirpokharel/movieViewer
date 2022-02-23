import React from 'react';
import PropTypes from 'prop-types';
import styledComponents from 'styled-components';
import { colors } from '../../constants/styleConstants';

const MovieCardContainer = styledComponents.div`
border-bottom: ${() => `1px solid ${colors.GREY_COLOR_2}`};
`;

const MoviesList = ({ movies }) => {
  return (
    <div style={{ background: 'green', height: 'calc(100vh - 93px)', overflowX: 'auto' }}>
      {movies.map((movie) => (
        <MovieCardContainer key={movie.imdbID}>
          <img src={movie.Poster} alt="movie poster" />
          <div>description</div>
        </MovieCardContainer>
      ))}
    </div>
  );
};
MoviesList.propTypes = {
  movies: PropTypes.array
};

export default MoviesList;
