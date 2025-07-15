import type { RequestHandler } from "express";
import type { AdminUpdateRecipe } from "../../lib/definitions";
import RecipeRepository from "./recipeRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    if (req.query.category) {
      const recipesByCategory = await RecipeRepository.readAllByCategory(
        +req.query.category,
      );
      res.status(200).json(recipesByCategory);
    }
    if (req.query.last) {
      const latestRecipes = await RecipeRepository.readByRecentlyAdded(
        +req.query.last,
      );
      res.status(200).json(latestRecipes);
    } else {
      const recipes = await RecipeRepository.readAll();
      res.json(recipes);
    }
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.params.id);
    const recipe = await RecipeRepository.read(recipeId);

    if (recipe == null) {
      res.sendStatus(404);
    } else {
      res.json(recipe);
    }
  } catch (err) {
    next(err);
  }
};

const editAdmin: RequestHandler = async (req, res, next) => {
  try {
    const updatedRecipeAdmin: AdminUpdateRecipe = {
      id: Number(req.params.id),
      name: req.body.name,
      is_validated: req.body.is_validated,
    };

    const affectedRows = await RecipeRepository.updateAdmin(updatedRecipeAdmin);

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
    const recipeId = Number(req.params.id);

    await RecipeRepository.delete(recipeId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  editAdmin,
  destroy,
};
