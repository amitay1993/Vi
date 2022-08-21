import axios from "axios";
import { apiService } from "../../index.js";

// https://api.themoviedb.org/3/movie/616037/credits?api_key=ee2a3856ff26d9a79c396414c1059282

const charctersPerActor = {};
const charactersWithMultipleActors = {};

export async function getCharactersWithMultipleActors(movies) {
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
  return charactersWithMultipleActors;
}

function filterMovies(movieCast, movieName) {
  // all cast in each movie
  //"known_for_department": "Acting",
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
  return filterMoviesWithMoreThanOneActor(charctersPerActor);
}

function filterMoviesWithMoreThanOneActor(charctersPerActor) {
  for (const [key, value] of Object.entries(charctersPerActor)) {
    if (value.length > 1) {
      const [movieName, characterName] = key.split("&*&");
      charactersWithMultipleActors[movieName] = {
        [characterName]: value,
      };
    }
  }
  return charactersWithMultipleActors;
}
