import { Router } from "express";
import { getActorsWithMultipleCharacters } from "../../api/actorsWithMultipleCharacters/index.js";
import { getAllMarvelMoviesNameAndId } from "../../api/getAllMarvelMovies/index.js";

export function actorsWithMultipleCharactersApi() {
  const router = Router();

  router.get("/", async (req, res) => {
    const response = await getAllMarvelMoviesNameAndId();
    const actorsWithMultipleCharacters = await getActorsWithMultipleCharacters(
      response
    );
    res.send(actorsWithMultipleCharacters);
  });
  return router;
}
