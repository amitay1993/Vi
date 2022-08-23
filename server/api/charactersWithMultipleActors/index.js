import axios from "axios";
import { apiService } from "../../apiService.js";

export async function getCharactersWithMultipleActors(movies) {
  if (!movies || movies.length === 0) {
    return [];
  }

  const charactersPerActor = {};
  const charactersWithMultipleActors = {};
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
    filterMovies(
      movieCast,
      movieName,
      charactersPerActor,
      charactersWithMultipleActors
    );
  });
  return charactersWithMultipleActors;
}

function filterMovies(
  movieCast,
  movieName,
  charctersPerActor,
  charactersWithMultipleActors
) {
  movieCast.forEach(({ known_for_department, name: playerName, character }) => {
    if (known_for_department === "Acting") {
      const key = `${movieName}&*&${character}`;
      if (charctersPerActor[key]) {
        charctersPerActor[key] = [...charctersPerActor[key], playerName];
      } else {
        charctersPerActor[key] = [playerName];
      }
    }
  });
  return filterMoviesWithMoreThanOneActor(
    charctersPerActor,
    charactersWithMultipleActors
  );
}

function filterMoviesWithMoreThanOneActor(
  charctersPerActor,
  charactersWithMultipleActors
) {
  for (const [key, actors] of Object.entries(charctersPerActor)) {
    if (actors.length > 1) {
      const [movieName, characterName] = key.split("&*&");
      charactersWithMultipleActors[movieName] = {
        [characterName]: actors,
      };
    }
  }
  return charactersWithMultipleActors;
}
