import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contacts } from "../entities/contacts.entities";
import { User } from "../entities/user.entities";
import { AppError } from "../errors/app.errors";

const emailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email,
    },
  });
  const contactRepository = AppDataSource.getRepository(Contacts);
  const contacts = await contactRepository.findOne({
    where: {
      email,
    },
  });
  if(contacts){
    throw new AppError("Contact already exists", 409);
  }

  if (user) {
    throw new AppError("User already exists", 409);
  }

  return next();
};

export default emailExistsMiddleware;
