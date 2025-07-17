import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Define recipe-related routes
import recipeActions from "./modules/recipe/recipeActions";
import recipeFormValidation from "./validation/recipeFormValidation";

import upload from "./validation/upload";

router.get("/api/recipes", recipeActions.browse);
router.get("/api/recipes/:id", recipeActions.read);
router.put("/api/admin/recipes/:id", recipeActions.editAdmin);
router.delete("/api/recipes/:id", recipeActions.destroy);
router.post(
  "/api/recipe",
  verifyCookie,
  upload.single("image"),
  recipeFormValidation,
  recipeActions.add,
);

/* ************************************************************************* */

// Define label-related routes
import labelActions from "./modules/label/labelActions";

router.get("/api/label", labelActions.browse);
/* ************************************************************************* */

// Define label-related routes
import categoryActions from "./modules/category/categoryActions";

router.get("/api/category", categoryActions.browse);

/* ************************************************************************* */

// Define ingredient-related routes
import ingredientActions from "./modules/ingredient/ingredientActions";

router.get("/api/ingredients", ingredientActions.browse);
router.get("/api/ingredients/:id", ingredientActions.read);
router.get(
  "/api/recipes/:id/ingredients",
  ingredientActions.readIngredientsByRecipe,
);
router.put("/api/admin/ingredients/:id", ingredientActions.editAdmin);
router.delete("/api/ingredients/:id", ingredientActions.destroy);

/* ************************************************************************* */

import { hashPassword, login } from "./middlewares/argon.middleware";
import {
  checkEmail,
  checkEmailAndStoreUserData,
} from "./middlewares/checkEmail.middleware";
import userActions from "./modules/user/userActions";
import validateUser from "./validation/userValidation";
import validateUserUpdate from "./validation/userValidationUser";

router.post("/api/login", checkEmailAndStoreUserData, login);

router.post(
  "/api/register",
  validateUser,
  checkEmail,
  hashPassword,
  userActions.add,
);
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put("/api/users/:id", validateUserUpdate, userActions.edit);
router.put("/api/admin/users/:id", userActions.editAdmin);
router.delete("/api/users/:id", userActions.destroy);

/* ************************************************************************* */

import { deleteCookie } from "./middlewares/cookieAuth/deleteCookie.middleware";
/** cokie validation route */
import { verifyCookie } from "./middlewares/cookieAuth/verifyCookie.middleware";

router.get("/api/me", verifyCookie);
router.post("/api/logout", deleteCookie);

// Define admin-related routes
import adminActions from "./modules/admin/adminActions";

router.get("/api/admin", adminActions.browse);

/* ************************************************************************* */

// Define step-related routes
import stepActions from "./modules/step/stepActions";

router.get("/api/recipes/:id/steps", stepActions.readStepsByRecipe);

/* ************************************************************************* */

export default router;
