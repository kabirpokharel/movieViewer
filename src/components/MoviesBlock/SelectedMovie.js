import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GlobalContext } from '../../context/provider';
import { Button, Col, Row, Spin, Tag, Typography } from 'antd';
// import { movieData } from '../../constants/dummyMovieSearchResult';
import { LikeFilled, LikeOutlined } from '@ant-design/icons/lib/icons';
import { colors } from '../../constants/styleConstants';
import { BodyText, TitleText } from '../Fonts/font';
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../../constants/actionConstants';
import isEmpty from '../../helpers/isEmpty';

const MoviesBlockBodyWrapper = styled.div`
  padding: 2rem 0 0 2rem;
`;
const NoContentWrapper = styled.div`
  display: flex;
  background: 'pink';
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const MovieDetailWrapper = styled.div`
  &::after {
    content: '·';
    padding: 0 0.25rem;
  }
  &:last-child {
    padding-right: 0;
    &::after {
      content: none;
    }
  }
`;
const MovieRatingWrapper = styled.div`
  display: flex;
  padding: 1rem 2rem 1rem 0;
`;
const RatingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:not(:last-child) {
    border-right: ${() => `1px solid ${colors.GREY_COLOR_2}`};
  }
`;

const { Title } = Typography;
const watchListToggler = (movieId, dispatch, watchlist) => {
  const isInWatchlist = watchlist.find((movie) => movie.imdbID === movieId);
  let action = ADD_TO_WATCHLIST;
  if (isInWatchlist) {
    action = REMOVE_FROM_WATCHLIST;
  }
  dispatch({ action, movieId });
};

const MovieDetails = ({ currentMovie, watchlist, movieListDispatch }) => {
  const [favourite, setfavourite] = useState(!false);
  const { Poster, Title, Rated, Year, Genre, Runtime, Actors, Ratings, imdbID } = currentMovie;
  return (
    <Row style={{ padding: '0 2rem 1rem 0', borderBottom: `0.5px solid ${colors.GREY_COLOR_2}` }}>
      <Col style={{ marginRight: '1rem' }}>
        <img src={Poster} height="300px" width="auto" alt="movie poster" />
      </Col>
      <Col style={{ flex: 1 }}>
        <Row justify="end">
          <Button
            // onClick={() => watchListToggler(imdbID, movieListDispatch, watchlist)}
            icon={favourite ? <LikeOutlined /> : <LikeFilled />}>
            Watchlist{' '}
          </Button>
        </Row>
        <Row align="bottom" style={{ height: 'calc(100% - 32px)' }}>
          <Col>
            <Row>
              <TitleText level={2}>{Title}</TitleText>
            </Row>
            <Row style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Tag color="default">{Rated}</Tag>
                <MovieDetailWrapper>{Year}</MovieDetailWrapper>
                <MovieDetailWrapper>{Genre}</MovieDetailWrapper>
                <MovieDetailWrapper>{Runtime}</MovieDetailWrapper>
              </div>
            </Row>
            <Row>{Actors}</Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const MoviePlot = ({ plot }) => {
  return (
    <Row
      style={{
        padding: '0.5rem 2rem 0.5rem 0',
        borderBottom: `0.5px solid ${colors.GREY_COLOR_2}`
      }}>
      <BodyText style={{ textAlign: 'justify' }}>{plot}</BodyText>
    </Row>
  );
};

const MovieRatings = ({ ratings }) => {
  return (
    <MovieRatingWrapper>
      {ratings.map((rating, id) => (
        <RatingContainer key={rating.Source + id}>
          <BodyText style={{ textAlign: 'center' }}>{rating.Value}</BodyText>
          <BodyText sm={true} color={colors.FONT_COLOR_2} style={{ textAlign: 'center' }}>
            {rating.Source}
          </BodyText>
        </RatingContainer>
      ))}
    </MovieRatingWrapper>
  );
};

const SelectedMovie = () => {
  const {
    movieListContext: { movieListState, movieListDispatch }
  } = useContext(GlobalContext);

  const { currentMovie, watchlist, loadingMovieDetails } = movieListState;

  if (loadingMovieDetails) {
    return (
      <NoContentWrapper>
        <Spin size="middle" />
      </NoContentWrapper>
    );
  }
  if (isEmpty(currentMovie)) {
    return (
      <NoContentWrapper>
        <Title disabled level={3}>
          Select a movie
        </Title>
      </NoContentWrapper>
    );
  }
  return (
    <MoviesBlockBodyWrapper>
      <MovieDetails {...{ currentMovie, watchlist, movieListDispatch }} />
      <MoviePlot plot={currentMovie.Plot} />
      <MovieRatings ratings={currentMovie.Ratings} />
    </MoviesBlockBodyWrapper>
  );
};

SelectedMovie.propTypes = {
  movieDetails: PropTypes.object,
  poster: PropTypes.string
};

export default SelectedMovie;
