import type { RequestHandler } from "express";
import { type SafeParseReturnType, z } from "zod";
import type { NewRecipeType } from "../lib/definitions";

const validateRecipe: RequestHandler = (req, res, next) => {
  let {
    title,
    persons,
    category,
    difficulty,
    cost,
    labels,
    ingredients,
    steps,
  } = req.body;

  try {
    cost = Number.parseInt(cost, 10);
    persons = Number.parseInt(persons, 10);
  } catch (error) {
    res.status(400).json({
      error: "Invalid number format for cost or persons",
    });
  }

  labels = JSON.parse(req.body.labels);
  ingredients = JSON.parse(req.body.ingredients);
  steps = JSON.parse(req.body.steps);

  const recipeSchema = z.object({
    title: z.string().min(2).max(45),
    persons: z.number().int().positive(),
    category: z.string().min(2).max(45),
    difficulty: z.string().min(2).max(45),
    cost: z.number().int().positive(),
    labels: z.array(z.string()),
    ingredients: z.array(
      z.object({
        name: z.string().min(1).max(255),
        quantity: z.number().int().positive(),
        unit: z.string().min(1).max(10),
      }),
    ),
    steps: z.array(
      z.object({
        description: z.string(),
      }),
    ),
  });

  const validData: SafeParseReturnType<unknown, NewRecipeType> =
    recipeSchema.safeParse({
      title,
      persons,
      category,
      difficulty,
      cost,
      labels,
      ingredients,
      steps,
    });

  if (!validData.success) {
    const errors: Record<string, string> = validData.error.issues.reduce<
      Record<string, string>
    >((acc, val) => {
      acc[val.path[0]] = val.message;
      return acc;
    }, {});

    res.status(400).json({ "Recipe validation errors:": errors });
    console.log("erreur de validation:", errors);
    return;
  }

  next();
};

export default validateRecipe;
