import axios from "axios";
import { apiService } from "../../apiService.js";

export async function getActorsFromMovies(movies) {
  if (!movies || movies.length === 0) {
    return [];
  }

  const moviesNamePerActor = {};

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
    filterMovies(movieCast, movieName, moviesNamePerActor);
  });
  return moviesNamePerActor;
}

function filterMovies(movieCast, movieName, moviesNamePerActor) {
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
