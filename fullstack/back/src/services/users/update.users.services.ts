import { UpdateResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { IUser, IUserUpdate } from "../../interfaces/users";

const updateUserService = async (
  userData: IUserUpdate,
  userId: string
): Promise<UpdateResult> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const updatedUser = userRepository.update(userId,{
    ...findUser,
    ...userData,
  });


  return updatedUser;
};

export default updateUserService;
