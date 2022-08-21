import axios from "axios";
import { apiService } from "../../index.js";

const moviesNamePerActor = {};
//controller calls service
//service aggregats on reaquest and response
export async function getActorsWithMultipleCharacters(movies) {
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
    filterMovieByActors(movieCast, movieName);
  });
  return moviesNamePerActor;
}

function filterMovieByActors(movieCast, movieName) {
  movieCast.forEach(({ known_for_department, name: playerName, character }) => {
    if (known_for_department === "Acting") {
      if (moviesNamePerActor[playerName]) {
        moviesNamePerActor[playerName] = [
          ...moviesNamePerActor[playerName],
          { movieName, character },
        ];
      } else {
        moviesNamePerActor[playerName] = [{ movieName, character }];
      }
    }
  });
  return moviesNamePerActor;
}
