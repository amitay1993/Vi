import { getCharactersWithMultipleActors } from "../../api/charactersWithMultipleActors/index.js";
import { response } from "../../index.js";
import { Router } from "express";
import { API_ROUTES } from "../apiRoutes.consts.js";

export function charactersWithMultipleActorsApi() {
  const router = Router();

  router.get(API_ROUTES.charactersWithMultipleActors, async (req, res) => {
    const actorsWithMultipleCharacters = await getCharactersWithMultipleActors(
      response["movies"]
    );
    res.send(actorsWithMultipleCharacters);
  });
  return router;
}
