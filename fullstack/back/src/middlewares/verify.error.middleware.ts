import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { AppError } from "../errors/app.errors";

export const verifyErrorMiddleware =
  (serializer: yup.BaseSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      return next();
    } catch (error) {
      throw new AppError(error.errors, 400);
    }
  };
