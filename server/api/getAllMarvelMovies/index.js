import axios from "axios";
import { apiService } from "../../apiService.js";

const keywordId = "180547-marvel-cinematic-universe-mcu";

export async function getAllMarvelMoviesNameAndId() {
  const queryParams = new URLSearchParams({
    [apiService.apiKeyName]: apiService.apiKeyValue,
  });

  const {
    data: { results },
  } = await axios.get(`
    ${apiService.baseUrl}/keyword/${keywordId}/movies?${queryParams}`);

  if (!results || results.length === 0) {
    throw new Error("no results");
  }

  const response = results.map(({ id, original_title }) => {
    return {
      id,
      original_title,
    };
  });
  return response;
}
