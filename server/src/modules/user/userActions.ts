import type { RequestHandler } from "express";
import type { AdminUpdateUser, UserType } from "../../lib/definitions";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res) => {
  const users = await userRepository.readAll();

  const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);

  res.json(usersWithoutPasswords);
};

const read: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const user = await userRepository.read(parsedId);

  if (user != null) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.sendStatus(404);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const currentUser = await userRepository.read(userId);
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }

    const updatedUser: UserType = {
      ...currentUser,
      firstname: req.body.firstname ?? currentUser.firstname,
      lastname: req.body.lastname ?? currentUser.lastname,
      pseudo: req.body.pseudo ?? currentUser.pseudo,
      email: req.body.email ?? currentUser.email,
      age: req.body.age ?? currentUser.age,
    };

    const affectedRows = await userRepository.update(updatedUser);

    if (affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const editAdmin: RequestHandler = async (req, res, next) => {
  try {
    const updatedUserAdmin: AdminUpdateUser = {
      id: Number(req.params.id),
      pseudo: req.body.pseudo,
      role_id: req.body.role_id,
      is_validated: req.body.is_validated,
    };

    const affectedRows = await userRepository.updateAdmin(updatedUserAdmin);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      role_id: req.body.role_id,
      is_validated: req.body.is_validated,
    };

    const insertId: number = await userRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    await userRepository.delete(userId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, editAdmin, add, destroy };
