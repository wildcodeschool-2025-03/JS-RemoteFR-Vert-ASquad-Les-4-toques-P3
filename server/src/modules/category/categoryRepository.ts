import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type categoryType = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name FROM category",
    );
    return rows as categoryType[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name FROM category WHERE id=?",
      [id],
    );
    return rows[0] as categoryType;
  }
}

export default new CategoryRepository();
