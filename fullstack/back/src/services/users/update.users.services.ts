import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { IUser, IUserUpdate } from "../../interfaces/users";


const updateUserService = async (
  userData: IUserUpdate,
  userId: string
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
    
  });

  const updatedUser = userRepository.create({
    ...findUser,
    ...userData,
  });

  await userRepository.save(updatedUser);
 
  return updatedUser;
};

export default updateUserService;