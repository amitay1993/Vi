import express from "express";
import "dotenv/config";
import { apiRoutes } from "./api-routes/index.js";
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));

registerApiRoutes();

function registerApiRoutes() {
  app.use("/api", apiRoutes());
}

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
