import type { RequestHandler } from "express";
import commentRepository from "./commentRepository";

const browseByRecipe: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.params.recipeId);
    const comments = await commentRepository.readByRecipe(recipeId);
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const user_id = req.auth.id;
    const newComment = {
      id: req.body.id,
      text: req.body.text,
      rating: req.body.rating,
      recipe_id: req.body.recipe_id,
      user_id,
    };

    const insertId: number = await commentRepository.create(newComment);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browseByRecipe, add };
