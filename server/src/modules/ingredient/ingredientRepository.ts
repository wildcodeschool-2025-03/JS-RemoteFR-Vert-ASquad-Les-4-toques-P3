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
    ingredients: {
      name: string;
      quantity: number;
      unit: string;
      id?: number;
    }[],
    recipeId: number,
  ) {
    /** ingredients are stored in an array from the front end.
     * existing ingredients are sended with their id, new ingrdients needs to be created.
     * we need to loop, in order to check if the ingredient already exists.
     * if it doesn't exist (no id), we create the ingredient and then insert the recipe_id and the ingredient_id in the recipe_ingredient table.
     * if it exists, we insert the recipe_id and the ingredient_id in the recipe_ingredient table.
     *
     */
    for (const ingredient of ingredients) {
      if (!ingredient.id) {
        await databaseClient.query<Result>(
          "INSERT INTO ingredient (nom) VALUES (?)",
          [ingredient.name],
        );
      }
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

  async readAllSorted() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM ingredient ORDER BY nom ASC",
    );
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
      "SELECT i.*, ri.quantity, ri.unit FROM recipe_ingredient AS ri INNER JOIN ingredient AS i ON ri.ingredient_id = i.id WHERE ri.recipe_id=?",
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
