import express from "express";
import { getCards, getCardByID, createCard, updateCard, deleteCard } from '../controllers/cards.js';
const router = express.Router();

// Returns all de cards
router.get("/", getCards);

// Return the cards by id
router.get("/:id", getCardByID);


// Create a new card
router.post("/new", createCard);

// Update a existent card
router.patch('/:id', updateCard);

// Delete a carda by id
router.delete('/:id', deleteCard);

export default router;
