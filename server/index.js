import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getAllMarvelMoviesNameAndId } from "./api/getAllMarvelMovies/index.js";
import { apiRoutes } from "./api-routes/index.js";
const app = express();

const PORT = process.env.PORT || 3001;

export const response = {};

app.use(express.urlencoded({ extended: false }));

registerApiRoutes();

function registerApiRoutes() {
  app.use("/api", apiRoutes());
}

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
