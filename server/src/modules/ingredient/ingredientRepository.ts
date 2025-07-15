import databaseClient from "../../../database/client";
import type { AdminUpdateIngredient } from "../../lib/definitions";

import type { Result, Rows } from "../../../database/client";

type recipeType = {
  id: number;
  nom: string;
  calories: string;
  proteines: string;
  glucides: string;
  lipides: string;
  sucre: string;
  sel: string;
  is_validated: boolean;
};

class IngredientRepository {
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
