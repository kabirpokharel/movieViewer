import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Col, Row, Tag } from 'antd';
import { movieData } from '../../constants/dummyMovieSearchResult';
import { LikeFilled, LikeOutlined } from '@ant-design/icons/lib/icons';
import { colors } from '../../constants/styleConstants';
import { BodyText, TitleText } from '../Fonts/font';

const MoviesBlockBodyWrapper = styled.div`
  padding: 2rem 0 0 2rem;
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

const MovieDetails = ({ movieDetails }) => {
  const [favourite, setfavourite] = useState(!false);
  const { Poster, Title, Rated, Year, Genre, Runtime, Actors, Ratings } = movieDetails;
  return (
    <Row style={{ paddingBottom: '1rem', borderBottom: `0.5px solid ${colors.GREY_COLOR_2}` }}>
      <Col>
        <img src={Poster} height="300px" width="auto" alt="movie poster" />
      </Col>
      <Col style={{ flex: 1 }}>
        <Row style={{ marginRight: '2rem' }} justify="end">
          <Button icon={favourite ? <LikeOutlined /> : <LikeFilled />}>Watchlist </Button>
        </Row>
        <Row align="bottom" style={{ height: 'calc(100% - 32px)', margin: '0 1rem' }}>
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
      <BodyText>{plot}</BodyText>
    </Row>
  );
};

const MovieRatings = ({ ratings }) => {
  return (
    <MovieRatingWrapper>
      {ratings.map((rating, id) => (
        <RatingContainer key={rating.Source + id}>
          <div>{rating.Value}</div>
          <div>{rating.Source}</div>
        </RatingContainer>
      ))}
    </MovieRatingWrapper>
  );
};

const SelectedMovie = () => {
  return (
    <MoviesBlockBodyWrapper>
      <MovieDetails movieDetails={movieData} />
      <MoviePlot plot={movieData.Plot} />
      <MovieRatings ratings={movieData.Ratings} />
    </MoviesBlockBodyWrapper>
  );
};

SelectedMovie.propTypes = {
  movieDetails: PropTypes.object,
  poster: PropTypes.string
};

export default SelectedMovie;
