import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { UserRoleType } from "../lib/definitions";
import userRepository from "../modules/user/userRepository";

export const decodeCookie: RequestHandler = async (req, res, next) => {
  try {
    const validCookie = req.cookies.auth_token;

    if (validCookie) {
      try {
        const decoded = jwt.verify(
          validCookie,
          process.env.APP_SECRET as string,
        ) as JwtPayload;

        const user = await userRepository.read(decoded.id);

        if (user) {
          const { password, ...rest } = user;

          req.user = { id: rest.id, role_id: rest.role_id } as UserRoleType;
        }
      } catch (err) {
        console.warn("Invalid token, continuing as guest:", err);
      }
    }

    next();
  } catch (err) {
    console.error("Error in decodeCookie middleware:", err);
    next();
  }
};
