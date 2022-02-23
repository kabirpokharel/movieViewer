import React from 'react';
import styledComponents from 'styled-components';
import { movieSearchResult } from '../../constants/dummyMovieSearchResult';
import { colors } from '../../constants/styleConstants';

const MovieListContainer = styledComponents.div``;
const MovieCardContainer = styledComponents.div`
border-bottom: ${() => `1px solid ${colors.GREY_COLOR_2}`};
`;

const MovieCard = () => {
  const { Search } = movieSearchResult;
  return (
    <MovieListContainer>
      {Search.map((movie) => (
        <MovieCardContainer key={movie.imdbID}>
          <img src={movie.Poster} alt="movie poster" />
          <div>description</div>
        </MovieCardContainer>
      ))}
    </MovieListContainer>
  );
};
export default MovieCard;
