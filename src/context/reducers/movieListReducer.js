// const movieListStateDummy = {
//   movieList: {},
// currentMovie: {},
//   loadingPage: false,
//   watchlist: []
// };

import {
  ADD_TO_WATCHLIST,
  FETCH_MOVIE_FAIL,
  FETCH_MOVIE_LOADING,
  FETCH_MOVIE_SUCCESS,
  REMOVE_FROM_WATCHLIST,
  SET_CURRENT_MOVIE
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
    case FETCH_MOVIE_LOADING:
      return { ...state, loadingPage: true };
    case FETCH_MOVIE_SUCCESS:
      return { ...state, loadingPage: false, movieList: payload };
    case FETCH_MOVIE_FAIL:
      return { ...state, loadingPage: false };
    case SET_CURRENT_MOVIE:
      return { ...state, currentMovie: payload };
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
