import { notification } from 'antd';
import {
  FETCH_MOVIE_LIST_LOADING,
  FETCH_MOVIE_LIST_SUCCESS,
  FETCH_MOVIE_LIST_FAIL
} from '../../constants/actionConstants';
import { apikey } from '../../constants/baseURL';
import axiosInstance from '../../helpers/axiosInstance';
import http_reqHandler from '../../helpers/http_reqHandler';

const loadMovieList = (formValues) => async (dispatch) => {
  const { movieKeyword, videoType } = formValues;

  dispatch({ type: FETCH_MOVIE_LIST_LOADING });
  let apiString = `/?s=${movieKeyword}&plot=full&apikey=${apikey}`;
  if (videoType !== 'any') {
    apiString = `/?s=${movieKeyword}&plot=full&apikey=${apikey}` + `&type=${videoType}`;
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
  dispatch({ type: FETCH_MOVIE_LIST_SUCCESS, payload: movieListPayload });
};

export default loadMovieList;
