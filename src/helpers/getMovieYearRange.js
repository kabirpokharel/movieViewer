const getMovieYearRange = (movieArr) => {
  const yearsList = movieArr.map((movie) => parseInt(movie.Year.substring(0, 4)));
  const min = Math.min(...yearsList);
  const max = Math.max(...yearsList);
  return { min, max };
};

export default getMovieYearRange;
