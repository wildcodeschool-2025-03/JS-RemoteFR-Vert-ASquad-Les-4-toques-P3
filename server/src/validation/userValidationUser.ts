import type { RequestHandler } from "express";
import { type SafeParseReturnType, z } from "zod";
import type { UserType } from "../lib/definitions";

const validateUserUpdate: RequestHandler = (req, res, next) => {
  const {
    firstname,
    lastname,
    pseudo,
    email,

    age,
  } = req.body;

  const userUpdateSchema = z.object({
    firstname: z.string().min(2).max(45).optional(),
    lastname: z.string().min(2).max(45).optional(),
    pseudo: z.string().min(2).max(45).optional(),
    email: z
      .string()
      .regex(
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
        "Email invalide",
      )
      .optional(),
    age: z.number().int().min(0).optional(),
  });

  const validData: SafeParseReturnType<
    unknown,
    Partial<UserType>
  > = userUpdateSchema.safeParse({
    firstname,
    lastname,
    pseudo,
    email,
    age,
  });

  if (!validData.success) {
    const errors: Record<string, string> = validData.error.issues.reduce<
      Record<string, string>
    >((acc, val) => {
      acc[val.path[0]] = val.message;
      return acc;
    }, {});

    res.status(401).json(errors);
    return;
  }

  next();
};

export default validateUserUpdate;
