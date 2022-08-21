import axios from "axios";
import { apiService } from "../../index.js";

// https://api.themoviedb.org/3/movie/616037/credits?api_key=ee2a3856ff26d9a79c396414c1059282

const moviesNamePerActor = {};

export async function getActorsFromMovies(movies) {
  const params = new URLSearchParams({
    [apiService.apiKeyName]: apiService.apiKeyValue,
  });

  const responses = movies.map(({ id }) =>
    axios.get(`${apiService.baseUrl}/movie/${id}/credits?${params}`)
  );

  const result = await Promise.all(responses);

  result.forEach((movie, index) => {
    const { original_title: movieName } = movies[index];
    const { cast: movieCast } = movie.data;
    filterMovies(movieCast, movieName);
  });
  return moviesNamePerActor;
}

function filterMovies(movieCast, movieName) {
  // all cast in each movie
  //"known_for_department": "Acting",
  movieCast.forEach(({ known_for_department, name: playerName }) => {
    if (known_for_department === "Acting") {
      if (moviesNamePerActor[playerName]) {
        moviesNamePerActor[playerName] = [
          ...moviesNamePerActor[playerName],
          movieName,
        ];
      } else {
        moviesNamePerActor[playerName] = [movieName];
      }
    }
  });
  return moviesNamePerActor;
}
