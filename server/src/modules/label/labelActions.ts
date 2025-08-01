import type { RequestHandler } from "express";
import LabelRepository from "./labelRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const labels = await LabelRepository.readAll();
    res.json(labels);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const labelId = Number(req.params.id);
    const label = await LabelRepository.read(labelId);

    if (label == null) {
      res.sendStatus(404);
    } else {
      res.json(label);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
