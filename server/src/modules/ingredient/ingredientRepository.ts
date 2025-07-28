import databaseClient from "../../../database/client";
import type { AdminUpdateIngredient } from "../../lib/definitions";

import type { Result, Rows } from "../../../database/client";

type recipeType = {
  id: number;
  nom: string;
  calories: string;
  is_validated: boolean;
};

class IngredientRepository {
  /** Insert ingredients after recipe creation */
  async create(
    ingredients: { name: string; quantity: number; unit: string }[],
    recipeId: number,
  ) {
    /** ingredients are stored in an array from the front end.
     * we need to loop, in order to check if the ingredient already exists
     */
    for (const ingredient of ingredients) {
      const [result] = await databaseClient.query<Rows>(
        "SELECT id FROM ingredient WHERE nom = ?",
        [ingredient.name],
      );

      /**
       * If the ingredient does not exist, it is inserted into the ingredient table
       */
      if ((result as []).length === 0) {
        await databaseClient.query<Result>(
          "INSERT INTO ingredient (nom) VALUES (?)",
          [ingredient.name],
        );
      }

      /**
       *  Then, once we are ensured to have an id for each ingredient, we can feed the recipe_ingredient table
       */
      await databaseClient.query<Result>(
        "INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit) VALUES (?, (SELECT id FROM ingredient WHERE nom = ?), ?, ?)",
        [recipeId, ingredient.name, ingredient.quantity, ingredient.unit],
      );
    }
    return ingredients as [];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM ingredient");
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM ingredient WHERE id=?",
      [id],
    );
    return rows[0] as recipeType;
  }

  async readByRecipe(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT i.* FROM recipe_ingredient AS ri INNER JOIN ingredient AS i ON ri.ingredient_id = i.id WHERE ri.recipe_id=?",
      [id],
    );
    return rows as recipeType[];
  }

  async updateAdmin(ingredient: AdminUpdateIngredient) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE ingredient SET nom = ?, calories = ?, is_validated = ? WHERE id = ?",
      [
        ingredient.nom,
        ingredient.calories,
        ingredient.is_validated,
        ingredient.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM ingredient WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new IngredientRepository();
