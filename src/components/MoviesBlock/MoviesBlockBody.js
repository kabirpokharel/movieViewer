import React from 'react';
// import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import MoviesList from './MoviesList';
import { movieSearchResult } from '../../constants/dummyMovieSearchResult';
import SelectedMovie from './SelectedMovie';

const MoviesBlockBody = () => {
  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 9 }}>
        <MoviesList movies={movieSearchResult.Search} />
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 15 }}>
        <SelectedMovie />
      </Col>
    </Row>
  );
};

MoviesBlockBody.propTypes = {};

// HeaderComponent.propTypes = {
//   children: PropTypes.element.isRequired,
//   bg: PropTypes.string
// };

export default MoviesBlockBody;
