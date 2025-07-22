import type { FieldPacket, ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { CommentType } from "../../lib/definitions";

class commentRepository {
  async readByRecipe(recipeId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT c.*, u.pseudo FROM comment c INNER JOIN user u ON c.user_id =u.id WHERE c.recipe_id = ? ORDER BY c.id DESC",
      [recipeId],
    );
    return rows as CommentType[];
  }

  async create(comment: CommentType) {
    const { text, rating, recipe_id, user_id } = comment;

    const [result]: [ResultSetHeader, FieldPacket[]] =
      await databaseClient.query<Result>(
        "INSERT INTO comment (text, rating, recipe_id, user_id) VALUES (?, ?, ?, ?)",
        [comment.text, comment.rating, comment.recipe_id, comment.user_id],
      );

    return result.insertId;
  }
}

export default new commentRepository();
