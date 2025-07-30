import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import userRepository from "../../modules/user/userRepository";

export const verifyCookie: RequestHandler = async (req, res) => {
  try {
    const validCookie = req.cookies.auth_token;

    if (!validCookie) {
      res.status(401).json({ message: "cookie is not valid" });
      return;
    }

    const decoded = jwt.verify(
      validCookie,
      process.env.APP_SECRET as string,
    ) as JwtPayload;

    const user = await userRepository.read(decoded.id);
    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(401).json({ message: "cookie is not valid" });
  }
};
