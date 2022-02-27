// const movieListStateDummy = {
//   movieList: {},
// currentMovie: {},
//   loadingPage: false,
// loadingMovieDetails:false;
//   watchlist: []
// };

import {
  FETCH_MOVIE_LIST_LOADING,
  FETCH_MOVIE_LIST_SUCCESS,
  FETCH_MOVIE_LIST_FAIL,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  FETCH_MOVIE_DETAIL_LOADING,
  FETCH_MOVIE_DETAIL_SUCCESS,
  FETCH_MOVIE_DETAIL_FAIL
} from '../../constants/actionConstants';

const watchlistAction = (currentWatchlist, movieId, action) => {
  if (action === 'add') {
    currentWatchlist.push(currentWatchlist.find((movie) => movieId === movie.imdbID));
  }
  if (action === 'remove') {
    currentWatchlist.push(currentWatchlist.filter((movie) => movieId !== movie.imdbID));
  }
  return currentWatchlist;
};
const movieListReducer = (state, { type, payload }) => {
  switch (type) {
    //movie list
    case FETCH_MOVIE_LIST_LOADING:
      return { ...state, loadingPage: true };
    case FETCH_MOVIE_LIST_SUCCESS:
      return { ...state, loadingPage: false, currentMovie: {}, movieList: payload };
    case FETCH_MOVIE_LIST_FAIL:
      return { ...state, loadingPage: false };
    //movie details
    case FETCH_MOVIE_DETAIL_LOADING:
      return { ...state, loadingMovieDetails: true };
    case FETCH_MOVIE_DETAIL_SUCCESS:
      return { ...state, loadingMovieDetails: false, currentMovie: payload };
    case FETCH_MOVIE_DETAIL_FAIL:
      return { ...state, loadingMovieDetails: false };
    //movie watchlist
    case ADD_TO_WATCHLIST:
      return {
        ...state,
        watchlist: watchlistAction(state.watchlist, payload, 'add')
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: watchlistAction(state.watchlist, payload, 'remove')
      };
  }
};

export default movieListReducer;
