export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  Headers: {
    accept: "application/json",
    Authroization: `Bearer${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });
  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch new movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};
// const url = 'https://api.themoviedb.org/3/authentication';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTBhZjY1MGY2MGY0NGEyNzAzZWYzYTYwYTNiOWY3MyIsIm5iZiI6MTY3NjI0MDY2MS41MzYsInN1YiI6IjYzZTk2NzE1NmM4NDkyMDA4ZGM0MmVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2cF47_ShVgjjUlqV7BU23NKC8xhtcoavxy-gmdWnCbM'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
