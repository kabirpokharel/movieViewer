import { useContext } from 'react';
import { notification } from 'antd';
import { GlobalContext } from '../../context/provider';
import {
  FETCH_MOVIE_LIST_LOADING,
  FETCH_MOVIE_LIST_SUCCESS,
  FETCH_MOVIE_LIST_FAIL,
  LOAD_BUFFER
} from '../../constants/actionConstants';
import { apikey } from '../../constants/baseURL';
import axiosInstance from '../../helpers/axiosInstance';
import http_reqHandler from '../../helpers/http_reqHandler';

const loadMovieList = (formValues) => async (dispatch) => {
  const {
    movieListContext: { movieListDispatch, movieListState }
  } = useContext(GlobalContext);
  const { pageNumber } = movieListState;
  const { movieKeyword, videoType, yearRange } = formValues;

  dispatch({ type: FETCH_MOVIE_LIST_LOADING });
  let apiString = `/?apikey=${apikey}&s=${movieKeyword}&plot=full&page=${pageNumber}`;
  if (videoType !== 'any') {
    apiString += `&type=${videoType}`;
  }
  const movieList = await axiosInstance.get(apiString).catch((err) => {
    dispatch({ type: FETCH_MOVIE_LIST_FAIL });
    http_reqHandler(err);
  });

  let movieListPayload = movieList.data;
  if (movieList.data.Response === 'False') {
    notification['info']({
      message: 'No movies found',
      description: 'Please select other movie type.',
      placement: 'bottomRight',
      duration: 2
    });
    movieListPayload = { ...movieList.data, Search: [], totalResults: '0' };
  }
  //dispatch to buffer
  dispatch({ type: LOAD_BUFFER, payload: movieListPayload });

  dispatch({ type: FETCH_MOVIE_LIST_SUCCESS, payload: movieListPayload });
};

export default loadMovieList;
