import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/app.errors";
import { User } from "../entities/user.entities";
import { AppDataSource } from "../data-source";

const clientRepo = AppDataSource.getRepository(User);

const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid Token", 401);
  }

  token = token.split(" ")[1];

  return jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    const id = String(decoded.sub);
    const clientFound = await clientRepo.findOneBy({ id });
    if (!clientFound) {
      throw new AppError(error.message, 404);
    }
    req.clientFound = clientFound;
    return next();
  });
};

export default authUserMiddleware;
