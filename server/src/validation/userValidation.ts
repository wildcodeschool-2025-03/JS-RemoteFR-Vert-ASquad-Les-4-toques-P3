import type { RequestHandler } from "express";
import { type SafeParseReturnType, z } from "zod";
import type { UserType } from "../lib/definitions";

const validateUser: RequestHandler = (req, res, next) => {
  const { firstname, lastname, pseudo, email, password, age } = req.body;

  const userSchema = z.object({
    firstname: z.string().min(2).max(45),
    lastname: z.string().min(2).max(45),
    pseudo: z.string().min(2).max(45),
    email: z
      .string()
      .regex(
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
        "Email invalide",
      ),
    password: z
      .string()
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
        "Le mot de passe doit contenir entre 8 et 16 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial",
      ),
    age: z.number(),
  });

  const validData: SafeParseReturnType<unknown, UserType> =
    userSchema.safeParse({
      firstname,
      lastname,
      pseudo,
      email,
      password,
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

export default validateUser;
