import type { RequestHandler } from "express";
import favoriRepository from "./favoriRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newFavorite = {
      recipe_id: req.body.recipe_id,
      user_id: req.body.user_id,
    };

    const insertId: number = await favoriRepository.create(newFavorite);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const user_id = Number(req.params.userId);
    const recipe_id = Number(req.params.recipeId);

    await favoriRepository.delete({ user_id, recipe_id });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { add, destroy };
