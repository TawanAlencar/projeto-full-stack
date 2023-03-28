import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import jwt from "jsonwebtoken";
import { IUserLogin } from "../../interfaces/users";
import { AppError } from "../../errors/app.errors";
import { User } from "../../entities/user.entities";
import "express-async-errors";

const createLoginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
    select: ["id", "email", "password"],
  });

  if (!user) {
    throw new AppError("Email invalid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("password invalid", 403);
  }

  const token = jwt.sign(
    {
      type: user.email,
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default createLoginService;
