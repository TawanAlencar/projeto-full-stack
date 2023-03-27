import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";




const deleteUserService = async (userId: string)=> {
  const userRepository = AppDataSource.getRepository(User);

  await userRepository.delete(userId)
  
  return ;
};

export default deleteUserService;