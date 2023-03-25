import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { IUser } from "../../interfaces/users";
import "express-async-errors"

const listUserService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  return await userRepository.find({
    select:[
        "id",
        "name",
        "email",
        "phone",
        "createdAt",
        "updatedAt"
    ],
    relations:{
        contacts: true
    }
  })
};

export default listUserService;