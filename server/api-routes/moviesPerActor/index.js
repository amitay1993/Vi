import { getActorsFromMovies } from "../../api/getActorsFromMovies/index.js";
import { response } from "../../index.js";
import { Router } from "express";
import { API_ROUTES } from "../apiRoutes.consts.js";

export function moviesPerActorApi() {
  const router = Router();

  router.get(API_ROUTES.moviesPerActor, async (req, res) => {
    const actorsFromMovies = await getActorsFromMovies(response["movies"]);
    res.send(actorsFromMovies);
  });
  return router;
}
