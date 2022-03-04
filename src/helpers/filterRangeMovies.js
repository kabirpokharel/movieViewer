const filterRangeMovies = (range, movies) => {
  const [min, max] = range;
  const filteredMoviesArr = movies.filter((movie) => {
    if (min <= parseInt(movie.Year.substring(0, 4)) <= max) {
      return true;
    }
  });
  return filteredMoviesArr;
};

export default filterRangeMovies;
