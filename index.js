import express from "express";
import bodyParser from "body-parser";

import cardsRoutes from "./routes/cards.js";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use("/api/v1/clashroyale/cards", cardsRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
