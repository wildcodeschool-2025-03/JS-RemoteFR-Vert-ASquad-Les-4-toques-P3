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

  async create(labels: string[], recipeId: number) {
    const insertedLabels = labels.map((l) => {
      return databaseClient.query<Result>(
        "INSERT INTO recipe_label (label, recipe_id) VALUES (?, ?)",
        [l, recipeId],
      );
    });

    const results = await Promise.all(insertedLabels);

    const insertIds = results.map(([r]) => r.insertId);

    return insertIds;
  }
}

export default new LabelRepository();
