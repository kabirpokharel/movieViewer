import {
  FETCH_MOVIE_LOADING,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAIL
} from '../../constants/actionConstants';
import { apikey } from '../../constants/baseURL';
import axiosInstance from '../../helpers/axiosInstance';
import http_reqHandler from '../../helpers/http_reqHandler';

const loadMovie = (formValues) => async (dispatch) => {
  const { movieKeyword, videoType } = formValues;
  dispatch({ type: FETCH_MOVIE_LOADING });
  let apiString = `/?s=${movieKeyword}&plot=full&apikey=${apikey}`;
  if (videoType !== 'any') {
    apiString = `/?s=${movieKeyword}&plot=full&apikey=${apikey}` + `&type=${videoType}`;
  }
  const movieList = await axiosInstance.get(apiString).catch((err) => {
    dispatch({ type: FETCH_MOVIE_FAIL });
    http_reqHandler(err);
  });
  dispatch({ type: FETCH_MOVIE_SUCCESS, payload: movieList.data });
};

export default loadMovie;
