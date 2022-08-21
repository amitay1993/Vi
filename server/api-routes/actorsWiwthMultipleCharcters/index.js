import { getActorsWithMultipleCharacters } from "../../api/actorsWithMultipleCharacters/index.js";
import { response } from "../../index.js";
import { Router } from "express";
import { API_ROUTES } from "../apiRoutes.consts.js";

export function actorsWithMultipleCharactersApi() {
  const router = Router();

  router.get(API_ROUTES.actorsWithMultipleCharacters, async (req, res) => {
    const actorsWithMultipleCharacters = await getActorsWithMultipleCharacters(
      response["movies"]
    );
    res.send(actorsWithMultipleCharacters);
  });
  return router;
}
