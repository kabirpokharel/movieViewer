import { notification } from 'antd';
import {
  FETCH_MOVIE_LIST_LOADING,
  FETCH_MOVIE_LIST_SUCCESS,
  FETCH_MOVIE_LIST_FAIL,
  LOAD_BUFFER,
  UPDATE_QUERY_DETAILS
} from '../../constants/actionConstants';
import { apikey } from '../../constants/baseURL';
import axiosInstance from '../../helpers/axiosInstance';
import getMovieYearRange from '../../helpers/getMovieYearRange';
import http_reqHandler from '../../helpers/http_reqHandler';
import isEmpty from '../../helpers/isEmpty';

const loadMovieList = async (dispatch, movieListState, newQuery) => {
  let newMovieListState = {
    ...movieListState,
    searchParams: { ...movieListState.searchParams, ...newQuery }
  };
  const { searchParams, movieList, movieBuffer } = newMovieListState;
  const { movieKeyword, videoType, yearRange, pageNumber } = searchParams;

  const clearBuffer = () => {
    dispatch({ type: LOAD_BUFFER, payload: [] });
  };
  const initilizeList = (movieListPayload) => {
    const { min, max } = getMovieYearRange(movieListPayload.Search);
    dispatch({ type: UPDATE_QUERY_DETAILS, payload: { yearRange: [min, max] } });
    // console.log('movie list --- -- >', movieListPayload);
    dispatch({ type: FETCH_MOVIE_LIST_SUCCESS, payload: movieListPayload });
  };
  const yearRangeDirty = (currentYearRange) => {
    if (JSON.stringify(currentYearRange) === '[0, 0]') {
      return false;
    } else return true;
  };
  const yearRangeChanged = (oldRange, newRange) => {
    if (!yearRangeDirty(newRange)) {
      return false;
    } else if (JSON.stringify(oldRange) === JSON.stringify(newRange)) {
      return false;
    } else return true;
  };

  const is_diff_movie_genre_year = () => {
    const {
      searchParams: { movieKeyword, videoType }
    } = movieListState;
    if (
      movieKeyword !== newQuery.movieKeyword ||
      videoType !== newQuery.videoType ||
      yearRangeChanged(movieListState.searchParams.yearRange, newQuery.yearRange)
    ) {
      return true;
    }
    return false;
  };

  const appendMovieList = (currentMovieListObj, newMovieListArr) => {
    initilizeList({
      ...currentMovieListObj,
      Search: newMovieListArr
    });
  };

  dispatch({ type: FETCH_MOVIE_LIST_LOADING });
  let apiString = `/?apikey=${apikey}&s=${movieKeyword}&plot=full&page=${pageNumber}`;
  if (videoType !== 'any') {
    apiString += `&type=${videoType}`;
  }
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
    dispatch({ type: FETCH_MOVIE_LIST_FAIL });
  } else if (fetchedMovies.data.Response === 'True') {
    let movieListResult = fetchedMovies.data.Search;
    let updatedMovieBuffer = [...movieBuffer, ...movieListResult];
    let updatedMovieList = [];
    console.log("Inside fetchedMovies.data.Response === 'True'");
    if (is_diff_movie_genre_year()) {
      console.log('is_diff_movie_genre_year triggered!!!!');
      initilizeList(movieListPayload);
      dispatch({
        type: UPDATE_QUERY_DETAILS,
        payload: {
          ...movieListState.searchParams,
          // yearRange: [],
          pageNumber: 1,
          movieKeyword,
          videoType
        }
      });
      clearBuffer();
    } else if (isEmpty(movieList)) {
      console.log('for empty movieList state');
      initilizeList(movieListPayload);
      clearBuffer();
    } else {
      console.log('else block besides everything');
      const remainingSlot = 10 - (movieList.Search.length % 10);
      if (updatedMovieBuffer.length < remainingSlot) {
        const newPageNumber = pageNumber + 1;
        loadMovieList(
          dispatch,
          { ...movieListState, movieBuffer: updatedMovieBuffer },
          { ...newQuery, pageNumber: newPageNumber }
        );
      }
      updatedMovieList = [...movieList.Search, ...updatedMovieBuffer.splice(0, remainingSlot)];
      dispatch({ type: LOAD_BUFFER, payload: updatedMovieBuffer });
      appendMovieList(movieList, updatedMovieList);
    }
  }
};

export default loadMovieList;
