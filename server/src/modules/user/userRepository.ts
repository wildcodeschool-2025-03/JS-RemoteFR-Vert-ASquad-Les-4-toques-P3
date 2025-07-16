import type { FieldPacket, ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { AdminUpdateUser, UserType } from "../../lib/definitions";

class userRepository {
  async create(user: UserType) {
    const { firstname, lastname, pseudo, email, password, age, role_id } = user;

    const [result]: [ResultSetHeader, FieldPacket[]] =
      await databaseClient.query<Result>(
        "INSERT INTO user (firstname, lastname, pseudo, email, password, age) VALUES (?, ?, ?, ?, ?, ?)",
        [
          user.firstname,
          user.lastname,
          user.pseudo,
          user.email,
          user.password,
          user.age,
        ],
      );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE id = ?",
      [id],
    );
    return rows[0] as UserType | undefined;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as UserType[];
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0] as UserType;
  }

  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT firstname FROM user WHERE email=?",
      [email],
    );
    return rows[0] as UserType | undefined;
  }

  async update(user: UserType) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstname = ?, lastname = ?, pseudo = ?, email = ?, age = ? WHERE id = ?",
      [
        user.firstname,
        user.lastname,
        user.pseudo,
        user.email,
        user.age,
        user.id,
      ],
    );
    return result.affectedRows;
  }

  async updateAdmin(user: AdminUpdateUser) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET pseudo = ?, role_id = ?, is_validated = ? WHERE id = ?",
      [user.pseudo, user.role_id, user.is_validated, user.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new userRepository();
