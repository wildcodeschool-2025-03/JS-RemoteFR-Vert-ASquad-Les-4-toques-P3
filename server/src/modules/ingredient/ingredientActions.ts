import type { RequestHandler } from "express";
import type { AdminUpdateIngredient } from "../../lib/definitions";
import IngredientRepository from "./ingredientRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const ingredients = await IngredientRepository.readAll();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const ingredientId = Number(req.params.id);
    const ingredient = await IngredientRepository.read(ingredientId);

    if (ingredient == null) {
      res.sendStatus(404);
    } else {
      res.json(ingredient);
    }
  } catch (err) {
    next(err);
  }
};

const editAdmin: RequestHandler = async (req, res, next) => {
  try {
    const updatedIngredientAdmin: AdminUpdateIngredient = {
      id: Number(req.params.id),
      nom: req.body.nom,
      calories: req.body.calories,
      is_validated: req.body.is_validated,
    };

    const affectedRows = await IngredientRepository.updateAdmin(
      updatedIngredientAdmin,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const ingredientId = Number(req.params.id);

    await IngredientRepository.delete(ingredientId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, editAdmin, destroy };
