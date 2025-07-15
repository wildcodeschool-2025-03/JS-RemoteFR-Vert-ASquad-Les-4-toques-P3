import type { RequestHandler } from "express";
import ingredientRepository from "../ingredient/ingredientRepository";
import recipeRepository from "../recipe/recipeRepository";
import userRepository from "../user/userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const dashboardRecettes = await recipeRepository.readAll();
    const dashboardIngredients = await ingredientRepository.readAll();
    const dashboardUtilisateurs = await userRepository.readAll();
    res.json({
      dashboardUtilisateurs,
      dashboardRecettes,
      dashboardIngredients,
    });
  } catch (err) {
    next(err);
  }
};

export default { browse };
