import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from './config/database.js'

const app = express();
const PORT = process.env.PORT || 8080;
const baseUrl ="/api/v1";

dotenv.config();
connectDatabase();

app.use(express.json());
app.use(cors());

import routes from "./routes/routes.js";
app.use(`${baseUrl}/pokemons`,routes);

app.listen(PORT, () => console.log (`Server is listening on port ${PORT}.`));