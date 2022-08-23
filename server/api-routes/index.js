import { Router } from "express";
import { API_ROUTES } from "./apiRoutes.consts.js";
import { moviesPerActorApi } from "./moviesPerActor/index.js";
import { charactersWithMultipleActorsApi } from "./charactersWithMultipleActors/index.js";
import { actorsWithMultipleCharactersApi } from "./actorsWiwthMultipleCharcters/index.js";

export function apiRoutes() {
  const router = Router();

  router.use(API_ROUTES.moviesPerActor, moviesPerActorApi());
  router.use(
    API_ROUTES.actorsWithMultipleCharacters,
    actorsWithMultipleCharactersApi()
  );
  router.use(
    API_ROUTES.charactersWithMultipleActors,
    charactersWithMultipleActorsApi()
  );
  return router;
}
