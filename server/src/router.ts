import cookieParser from "cookie-parser";
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

router.get("/api/recipes", recipeActions.browse);
router.get("/api/recipes/:id", recipeActions.read);
router.put("/api/admin/recipes/:id", recipeActions.editAdmin);
router.delete("/api/recipes/:id", recipeActions.destroy);

/* ************************************************************************* */

// Define ingredient-related routes
import ingredientActions from "./modules/ingredient/ingredientActions";

router.get("/api/ingredients", ingredientActions.browse);
router.get("/api/ingredients/:id", ingredientActions.read);
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

const cookieCheck = cookieParser();
router.get("/api/me", cookieCheck, verifyCookie);
router.post("/api/logout", cookieCheck, deleteCookie);

// Define admin-related routes
import adminActions from "./modules/admin/adminActions";

router.get("/api/admin", adminActions.browse);

/* ************************************************************************* */

export default router;
