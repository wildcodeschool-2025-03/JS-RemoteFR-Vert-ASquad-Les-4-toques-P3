import type { RequestHandler } from "express";
import CategoryRepository from "./categoryRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const categories = await CategoryRepository.readAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await CategoryRepository.read(categoryId);

    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
