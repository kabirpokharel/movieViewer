import {
  FETCH_MOVIE_DETAIL_LOADING,
  FETCH_MOVIE_DETAIL_SUCCESS,
  FETCH_MOVIE_DETAIL_FAIL
} from '../../constants/actionConstants';
import { apikey } from '../../constants/baseURL';
import axiosInstance from '../../helpers/axiosInstance';
import http_reqHandler from '../../helpers/http_reqHandler';

const loadMovieDetails = (imdbID) => async (dispatch) => {
  dispatch({ type: FETCH_MOVIE_DETAIL_LOADING });
  const movieDetails = await axiosInstance
    .get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apikey}`)
    .catch((err) => {
      dispatch({ type: FETCH_MOVIE_DETAIL_FAIL });
      http_reqHandler(err);
    });
  dispatch({ type: FETCH_MOVIE_DETAIL_SUCCESS, payload: movieDetails.data });
};

export default loadMovieDetails;
