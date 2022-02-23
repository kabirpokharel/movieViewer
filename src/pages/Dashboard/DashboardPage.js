import React from 'react';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { colors } from '../../constants/styleConstants';
import MovieSearchForm from '../../components/forms/movieSearchForm/MovieSearchForm';
import MoviesBlockBody from '../../components/MoviesBlock/MoviesBlockBody';

const DashboardPage = () => {
  return (
    <>
      <HeaderComponent bg={colors.GREY_COLOR_1}>
        <MovieSearchForm />
      </HeaderComponent>
      <MoviesBlockBody />
    </>
  );
};

export default DashboardPage;
