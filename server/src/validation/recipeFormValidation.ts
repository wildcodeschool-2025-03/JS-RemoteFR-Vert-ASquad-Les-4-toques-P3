import type { RequestHandler } from "express";
import { type SafeParseReturnType, z } from "zod";
import type { ParsedNewRecipeType } from "../lib/definitions";

const validateRecipe: RequestHandler = (req, res, next) => {
  const {
    title,
    persons,
    category,
    difficulty,
    cost,
    labels,
    ingredients,
    steps,
  } = req.body;

  const parsedLabels = JSON.parse(req.body.labels);
  const parsedIngredients = JSON.parse(req.body.ingredients);
  const parsedSteps = JSON.parse(req.body.steps);
  let costInt = 0;
  let personsInt = 0;

  try {
    costInt = Number.parseInt(cost, 10);
    personsInt = Number.parseInt(persons, 10);
  } catch (error) {
    res.status(400).json({
      error: "Invalid number format for cost or persons",
    });
    return;
  }
  const parsedItems: ParsedNewRecipeType = {
    title,
    personsInt,
    category,
    difficulty,
    costInt,
    parsedLabels,
    parsedIngredients,
    parsedSteps,
  };

  const recipeSchema = z.object({
    title: z.string().min(2).max(45),
    personsInt: z.number().int().positive(),
    category: z.string().min(2).max(45),
    difficulty: z.string().min(2).max(45),
    costInt: z.number().int().positive(),
    parsedLabels: z.array(z.string()).default([]),
    parsedIngredients: z.array(
      z.object({
        name: z.string().min(1).max(255),
        quantity: z.number().int().positive(),
        unit: z.string().min(1).max(10),
      }),
    ),
    parsedSteps: z.array(
      z.object({
        description: z.string(),
      }),
    ),
  });

  const validData: SafeParseReturnType<unknown, ParsedNewRecipeType> =
    recipeSchema.safeParse({
      title,
      personsInt,
      category,
      difficulty,
      costInt,
      parsedLabels,
      parsedIngredients,
      parsedSteps,
    });

  if (!validData.success) {
    const errors: Record<string, string> = validData.error.issues.reduce<
      Record<string, string>
    >((acc, val) => {
      acc[val.path[0]] = val.message;
      return acc;
    }, {});

    res.status(400).json({ "Recipe validation errors:": errors });
    return;
  }
  req.body = parsedItems;
  next();
};

export default validateRecipe;
