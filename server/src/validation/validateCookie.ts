import type { RequestHandler } from "express";

export const validateCookie: RequestHandler = async (req, res, next) => {
  try {
    const validCookie = req.cookies.auth_token;

    if (!validCookie) {
      res.status(401).json({ message: "cookie is not valid" });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
