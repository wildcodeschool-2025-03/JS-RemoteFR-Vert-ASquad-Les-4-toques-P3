import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type labelType = {
  id: number;
  label: string;
  image: string;
};

class LabelRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, label, image FROM label",
    );
    return rows as labelType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, label, image FROM label WHERE id=?",
      [id],
    );
    return rows[0] as labelType;
  }

  /** 
   Insert in recipe_label table new recipe labels ids and recipe id to attach labels to recipe
   */
  async create(labels: string[], recipeId: number) {
    return await databaseClient.query<Result>(
      "INSERT INTO recipe_label (label_id, recipe_id) VALUES ?",
      [labels.map((label) => [label, recipeId])],
    );
  }
}

export default new LabelRepository();
