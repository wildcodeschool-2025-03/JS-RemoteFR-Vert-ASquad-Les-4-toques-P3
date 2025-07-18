import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type stepType = {
  id: number;
  description: string;
};

class StepRepository {
  /** 
   Create step and select recipe id from recipe table by comparing recipe.id with recipe_id value 
  */
  async create(steps: { description: string }[], recipeId: number) {
    return await databaseClient.query(
      "INSERT INTO step (description, recipe_id) VALUES ?",
      [steps.map((step) => [step.description, recipeId])],
    );
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, description FROM step",
    );
    return rows as stepType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, description FROM step WHERE id=? ",
      [id],
    );
    return rows[0] as stepType;
  }

  async readByRecipe(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT step.id, description FROM step JOIN recipe ON step.recipe_id = recipe.id WHERE recipe.id=?",
      [id],
    );
    return rows as stepType[];
  }
}

export default new StepRepository();
