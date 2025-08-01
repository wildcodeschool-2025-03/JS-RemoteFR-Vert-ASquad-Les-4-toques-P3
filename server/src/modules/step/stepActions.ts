import type { RequestHandler } from "express";
import StepRepository from "./stepRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const steps = await StepRepository.readAll();
    res.json(steps);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const stepId = Number(req.params.id);
    const step = await StepRepository.read(stepId);

    if (step == null) {
      res.sendStatus(404);
    } else {
      res.json(step);
    }
  } catch (err) {
    next(err);
  }
};

const readStepsByRecipe: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.params.id);
    const stepsByRecipe = await StepRepository.readByRecipe(recipeId);

    if (stepsByRecipe == null) {
      res.sendStatus(404);
    } else {
      res.json(stepsByRecipe);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readStepsByRecipe };
