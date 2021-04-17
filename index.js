
const express = require("express");
const mongoose = require("mongoose");

const cardsRoutes = require("./routes/cards.js");


mongoose.connect("mongodb://localhost/ClashRoyale", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api/v1/clashroyale/cards", cardsRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
