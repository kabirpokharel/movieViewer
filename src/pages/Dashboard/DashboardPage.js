import React from 'react';

import HeaderComponent from '../../components/Header/HeaderComponent';
import { colors } from '../../constants/styleConstants';
import MovieSearchForm from '../../components/forms/movieSearchForm/MovieSearchForm';
import MoviesBlockBody from '../../components/MoviesBlock/MoviesBlockBody';
import GlobalProvider from '../../context/provider';
import { DashboardWrapper } from './styledDashboard';

const DashboardPage = () => {
  return (
    <GlobalProvider>
      <DashboardWrapper>
        <HeaderComponent bg={colors.GREY_COLOR_1}>
          <MovieSearchForm />
        </HeaderComponent>
        <MoviesBlockBody />
      </DashboardWrapper>
    </GlobalProvider>
  );
};

export default DashboardPage;
