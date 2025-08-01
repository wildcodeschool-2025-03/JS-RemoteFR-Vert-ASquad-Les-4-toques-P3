import type { FieldPacket, ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";
import type { FavoriType } from "../../lib/definitions";

class favoriteRepository {
  async create(favorite: FavoriType) {
    const { recipe_id, user_id } = favorite;

    const [result]: [ResultSetHeader, FieldPacket[]] =
      await databaseClient.query<Result>(
        "INSERT INTO favori (recipe_id, user_id) VALUES (?, ?)",
        [favorite.recipe_id, favorite.user_id],
      );

    return result.affectedRows;
  }

  async delete(favorite: FavoriType) {
    const { user_id, recipe_id } = favorite;
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favori WHERE user_id = ? AND recipe_id=?",
      [user_id, recipe_id],
    );
    return result.affectedRows;
  }
}

export default new favoriteRepository();
