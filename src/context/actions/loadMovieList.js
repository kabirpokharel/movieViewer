import { useContext } from 'react';
import { notification } from 'antd';
// import { GlobalContext } from '../../context/provider';
import {
  FETCH_MOVIE_LIST_LOADING,
  FETCH_MOVIE_LIST_SUCCESS,
  FETCH_MOVIE_LIST_FAIL,
  LOAD_BUFFER
} from '../../constants/actionConstants';
import { apikey } from '../../constants/baseURL';
import axiosInstance from '../../helpers/axiosInstance';
import http_reqHandler from '../../helpers/http_reqHandler';
import isEmpty from '../../helpers/isEmpty';

const loadMovieList = async (dispatch, movieListState, newQuery) => {
  // const {
  //   movieListContext: { movieListDispatch, movieListState }
  // } = useContext(GlobalContext);

  // if (movieListState.searchParams.type !== newQuery.type) {
  //   return;
  // }
  let newMovieListState = {
    ...movieListState,
    searchParams: { ...movieListState.searchParams, ...newQuery }
  };
  const { searchParams, movieList, movieBuffer } = newMovieListState;
  const { movieKeyword, videoType, yearRange, pageNumber } = searchParams;

  console.log('see this is from loadMovieList -- -->', movieListState);

  const clearBuffer = () => {
    dispatch({ type: LOAD_BUFFER, payload: [] });
  };
  const appendMovieList = (currentMovieListObj, newMovieListArr) => {
    dispatch({
      type: FETCH_MOVIE_LIST_SUCCESS,
      payload: {
        ...currentMovieListObj,
        Search: [...currentMovieListObj.Search, ...newMovieListArr]
      }
    });
  };

  dispatch({ type: FETCH_MOVIE_LIST_LOADING });
  let apiString = `/?apikey=${apikey}&s=${movieKeyword}&plot=full&page=${pageNumber}`;
  if (videoType !== 'any') {
    apiString += `&type=${'movies'}`;
  }

  console.log('see this is api string - ---- -- > ', apiString);
  const fetchedMovies = await axiosInstance.get(apiString).catch((err) => {
    dispatch({ type: FETCH_MOVIE_LIST_FAIL });
    http_reqHandler(err);
  });

  let movieListPayload = fetchedMovies.data;
  if (fetchedMovies.data.Response === 'False') {
    notification['info']({
      message: 'No movies found',
      description: 'Please select other movie type.',
      placement: 'bottomRight',
      duration: 2
    });
    if (isEmpty(movieList)) {
      dispatch({
        type: FETCH_MOVIE_LIST_SUCCESS,
        payload: { ...fetchedMovies.data, Search: [], totalResults: '0' }
      });
    } else {
      dispatch({ type: FETCH_MOVIE_LIST_FAIL });
    }
  }
  if (fetchedMovies.data.Response === 'True') {
    let movieListResult = fetchedMovies.data.Search;
    let updatedMovieBuffer = [...movieBuffer, ...movieListResult];
    let updatedMovieList = [];
    if (isEmpty(movieList)) {
      dispatch({ type: FETCH_MOVIE_LIST_SUCCESS, payload: movieListPayload });
      clearBuffer();
    } else {
      if (isEmpty(movieList.Search) || movieList.Search.length % 10 !== 0) {
        const remainingSlot = 10 - (movieList.Search.length % 10);
        updatedMovieList = [...movieList.Search, ...updatedMovieBuffer.splice(0, remainingSlot)];
        dispatch({ type: LOAD_BUFFER, payload: updatedMovieBuffer });
        appendMovieList(movieList, updatedMovieList);
      } else {
        clearBuffer();
        appendMovieList(movieList, updatedMovieBuffer);
      }
    }
  }
};

export default loadMovieList;
