import { getActorsFromMovies } from "../../api/getActorsFromMovies/index.js";
import { Router } from "express";
import { getAllMarvelMoviesNameAndId } from "../../api/getAllMarvelMovies/index.js";

export function moviesPerActorApi() {
  const router = Router();

  router.get("/", async (req, res) => {
    const response = await getAllMarvelMoviesNameAndId();
    const actorsFromMovies = await getActorsFromMovies(response);
    res.send(actorsFromMovies);
  });
  return router;
}
