import React from 'react';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { colors } from '../../constants/styleConstants';
import MovieSearchForm from '../../components/forms/movieSearchForm/MovieSearchForm';
import MoviesBlockBody from '../../components/MoviesBlock/MoviesBlockBody';
import GlobalProvider from '../../context/provider';

const DashboardPage = () => {
  return (
    <GlobalProvider>
      <HeaderComponent bg={colors.GREY_COLOR_1}>
        <MovieSearchForm />
      </HeaderComponent>
      <MoviesBlockBody />
    </GlobalProvider>
  );
};

export default DashboardPage;
