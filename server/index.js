import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getAllMarvelMoviesNameAndId } from "./api/getAllMarvelMovies/index.js";
import { actorsWithMultipleCharactersApi } from "./api-routes/actorsWiwthMultipleCharcters/index.js";
import { moviesPerActorApi } from "./api-routes/moviesPerActor/index.js";
import { charactersWithMultipleActorsApi } from "./api-routes/charactersWithMultipleActors/index.js";
const app = express();

const PORT = process.env.PORT || 3001;

export const apiService = {
  apiKeyName: process.env.API_KEY_NAME,
  apiKeyValue: process.env.API_KEY_VALUE,
  baseUrl: process.env.API_BASE_URL,
};

export const response = {};

app.use(express.urlencoded({ extended: false }));
preFetch().then(
  () => {
    registerApiRoutes();
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  },
  (reason) => {
    throw new Error(`Failed to fetch marvel movies data ${reason}`);
  }
);

function registerApiRoutes() {
  app.use("/api", charactersWithMultipleActorsApi());
  app.use("/api", actorsWithMultipleCharactersApi());
  app.use("/api", moviesPerActorApi());
}
async function preFetch() {
  response["movies"] = await getAllMarvelMoviesNameAndId();
}
