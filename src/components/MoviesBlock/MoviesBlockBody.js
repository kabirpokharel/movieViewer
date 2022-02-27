import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { GlobalContext } from '../../context/provider';
import { Col, Row, Spin } from 'antd';
import MoviesList from './MoviesList';
// import { movieSearchResult } from '../../constants/dummyMovieSearchResult';
import SelectedMovie from './SelectedMovie';
import isEmpty from '../../helpers/isEmpty';

const MoviesBlockBody = () => {
  const {
    movieListContext: { movieListState }
  } = useContext(GlobalContext);

  const { movieList, loadingPage } = movieListState;
  console.log('see this is movieListState', movieListState);

  if (isEmpty(movieList)) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 93px - 3rem)'
        }}>
        <div>No movies to show</div>
      </div>
    );
  }
  if (loadingPage) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'

          // background: 'yellow'
        }}>
        <Spin style={{ color: 'grey' }} size="large" />
      </div>
    );
  }
  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 9 }}>
        <MoviesList {...{ movieList }} />
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
