import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors/app.errors";
import { IUser } from "../../interfaces/users";

const deleteUserService = async (userId: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (findUser.isActive === false) {
    throw new AppError("User is not active",400);
  }

  const user = await userRepository.save({
    ...findUser,
    isActive: false,
  });


  return user;
};

export default deleteUserService;