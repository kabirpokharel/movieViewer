const movieSearchResult = {
  Search: [
    {
      Title: 'Star Wars: Episode IV - A New Hope',
      Year: '1977',
      imdbID: 'tt0076759',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
    },
    {
      Title: 'Star Wars: Episode V - The Empire Strikes Back',
      Year: '1980',
      imdbID: 'tt0080684',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
    },
    {
      Title: 'Star Wars: Episode VI - Return of the Jedi',
      Year: '1983',
      imdbID: 'tt0086190',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
    },
    {
      Title: 'Star Wars: Episode VII - The Force Awakens',
      Year: '2015',
      imdbID: 'tt2488496',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg'
    },
    {
      Title: 'Star Wars: Episode I - The Phantom Menace',
      Year: '1999',
      imdbID: 'tt0120915',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
    },
    {
      Title: 'Star Wars: Episode III - Revenge of the Sith',
      Year: '2005',
      imdbID: 'tt0121766',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg'
    },
    {
      Title: 'Star Wars: Episode II - Attack of the Clones',
      Year: '2002',
      imdbID: 'tt0121765',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg'
    },
    {
      Title: 'Star Wars: Episode VIII - The Last Jedi',
      Year: '2017',
      imdbID: 'tt2527336',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg'
    },
    {
      Title: 'Rogue One: A Star Wars Story',
      Year: '2016',
      imdbID: 'tt3748528',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg'
    },
    {
      Title: 'Star Wars: Episode IX - The Rise of Skywalker',
      Year: '2019',
      imdbID: 'tt2527338',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg'
    }
  ],
  totalResults: '731',
  Response: 'True'
};

const movieData = {
  Title: 'Star Wars: Episode V - The Empire Strikes Back',
  Year: '1980',
  Rated: 'PG',
  Released: '20 Jun 1980',
  Runtime: '124 min',
  Genre: 'Action, Adventure, Fantasy, Sci-Fi',
  Director: 'Irvin Kershner',
  Writer: 'Leigh Brackett, Lawrence Kasdan, George Lucas',
  Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
  Plot: "Luke Skywalker, Han Solo, Princess Leia and Chewbacca face attack by the Imperial forces and its AT-AT walkers on the ice planet Hoth. While Han and Leia escape in the Millennium Falcon, Luke travels to Dagobah in search of Yoda. Only with the Jedi Master's help will Luke survive when the Dark Side of the Force beckons him into the ultimate duel with Darth Vader.",
  Language: 'English',
  Country: 'United States',
  Awards: 'Won 2 Oscars. 25 wins & 20 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '8.7/10'
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '94%'
    },
    {
      Source: 'Metacritic',
      Value: '82/100'
    }
  ],
  Metascore: '82',
  imdbRating: '8.7',
  imdbVotes: '1,235,361',
  imdbID: 'tt0080684',
  Type: 'movie',
  DVD: '21 Sep 2004',
  BoxOffice: '$292,753,960',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True'
};

export { movieSearchResult, movieData };
