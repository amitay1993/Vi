import { getCharactersWithMultipleActors } from "../../api/charactersWithMultipleActors/index.js";
import { Router } from "express";
import { getAllMarvelMoviesNameAndId } from "../../api/getAllMarvelMovies/index.js";

export function charactersWithMultipleActorsApi() {
  const router = Router();

  router.get("/", async (req, res) => {
    const response = await getAllMarvelMoviesNameAndId();
    const actorsWithMultipleCharacters = await getCharactersWithMultipleActors(
      response
    );
    res.send(actorsWithMultipleCharacters);
  });
  return router;
}
