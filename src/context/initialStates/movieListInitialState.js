const movieListInitialState = {
  movieList: {},
  currentMovie: {},
  loadingPage: false,
  loadingMovieDetails: false,
  watchlist: [],
  searchParams: {}, //movieKeyword, videoType, yearRange
  movieBuffer: [],

  pageNumber: 1
};

export default movieListInitialState;
