import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { AdminUpdateRecipe } from "../../lib/definitions";

type recipeType = {
  id: number;
  name: string;
  cost: number;
  difficulty: number;
  nb_people: number;
  qte_ingredients: number;
  picture: string;
  additional_text: string;
  is_validated: boolean;
  user_id: number;
};

class RecipeRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, qte_ingredients, picture, additional_text, is_validated, user_id FROM recipe",
    );
    return rows as recipeType[];
  }

  async readAllByCategory(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, qte_ingredients, picture, additional_text, is_validated, user_id FROM recipe WHERE category_id=?",
      [id],
    );
    return rows as recipeType[];
  }

  async readByRecentlyAdded(count: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, qte_ingredients, picture, additional_text FROM recipe ORDER BY id DESC LIMIT ?",
      [count],
    );
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, qte_ingredients, picture, additional_text, is_validated FROM recipe WHERE recipe.id=? ",
      [id],
    );
    return rows[0] as recipeType;
  }

  async updateAdmin(recipe: AdminUpdateRecipe) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE recipe SET name = ?, is_validated = ? WHERE id = ?",
      [recipe.name, recipe.is_validated, recipe.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM recipe WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new RecipeRepository();
