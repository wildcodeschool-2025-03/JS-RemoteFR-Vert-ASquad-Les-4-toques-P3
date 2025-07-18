import type { FieldPacket, ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type {
  AdminUpdateRecipe,
  ParsedNewRecipeType,
} from "../../lib/definitions";

type recipeType = {
  id: number;
  name: string;
  cost: number;
  difficulty: string;
  nb_people: number;
  picture: string;
  is_validated: boolean;
  user_id: number;
};

class RecipeRepository {
  /** 
   Create recipe and select category id from category table by comparing category.name with category value 
  */

  async create(recipe: ParsedNewRecipeType, imagePath: string, userId: number) {
    const { title, personsInt, difficulty, costInt, category } = recipe;
    const [result]: [ResultSetHeader, FieldPacket[]] =
      await databaseClient.query<Result>(
        "INSERT INTO recipe (name, cost, difficulty, nb_people, picture, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?, (SELECT id FROM category WHERE name = ?))",
        [title, costInt, difficulty, personsInt, imagePath, userId, category],
      );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, picture, is_validated, user_id FROM recipe",
    );
    return rows as recipeType[];
  }

  async readAllByCategory(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, picture, is_validated, user_id FROM recipe WHERE category_id=?",
      [id],
    );
    return rows as recipeType[];
  }

  async readByRecentlyAdded(count: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, picture FROM recipe ORDER BY id DESC LIMIT ?",
      [count],
    );
    return rows as recipeType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name, cost, difficulty, nb_people, picture, is_validated FROM recipe WHERE recipe.id=? ",
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
