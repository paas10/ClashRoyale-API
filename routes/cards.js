const express = require("express");
const CardController = require('../controllers/cards.js');

const router = express.Router();

// Returns all de cards
router.get("/", CardController.getCards);

// Return the cards by id
router.get("/:id", CardController.getCardByID);


// Create a new card
router.post("/new", CardController.createCard);

// Update a existent card
router.patch('/:id', CardController.updateCard);

// Delete a carda by id
router.delete('/:id', CardController.deleteCard);

module.exports = router;
