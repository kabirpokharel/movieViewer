import React, { useContext } from 'react';
import { GlobalContext } from '../../context/provider';
import { Col, Row, Spin, Typography } from 'antd';
import MoviesList from './MoviesList';
import SelectedMovie from './SelectedMovie';
import isEmpty from '../../helpers/isEmpty';
import { BodyElemCentered } from './styledMovieBlock';

const { Title } = Typography;
const MoviesBlockBody = () => {
  const {
    movieListContext: { movieListState }
  } = useContext(GlobalContext);

  const { movieList, loadingPage } = movieListState;

  if (isEmpty(movieList)) {
    return (
      <BodyElemCentered>
        <Title disabled level={4}>
          No movies to show
        </Title>
      </BodyElemCentered>
    );
  }
  if (loadingPage) {
    return (
      <BodyElemCentered>
        <Spin size="large" />
      </BodyElemCentered>
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
