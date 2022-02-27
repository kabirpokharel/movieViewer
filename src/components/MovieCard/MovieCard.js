import React from 'react';
import styled from 'styled-components';
// import { movieSearchResult } from '../../constants/dummyMovieSearchResult';
import { colors } from '../../constants/styleConstants';
import { BodyText } from '../Fonts/font';

const MovieCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: ${() => `1px solid ${colors.GREY_COLOR_2}`};
  // border-right: ${() => `1px solid ${colors.GREY_COLOR_2}`};
`;

const MovieCard = ({ movie, movieCardClicked }) => {
  const { Poster, Title, Year } = movie;
  return (
    <MovieCardContainer onClick={movieCardClicked}>
      <img
        style={{ objectFit: 'cover', borderRadius: '2px' }}
        src={Poster}
        height="50px"
        width="50px"
        alt="movie poster"
      />
      <div style={{ paddingLeft: '1rem' }}>
        <div>{Title}</div>
        <BodyText sm={true} color={colors.FONT_COLOR_3}>
          {Year}
        </BodyText>
      </div>
    </MovieCardContainer>
  );
};
export default MovieCard;
