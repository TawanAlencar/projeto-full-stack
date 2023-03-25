import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import {  IUserRequest } from "../../interfaces/users";
import "express-async-errors"
import { AppError } from "../../errors/app.errors";

const userRepository = AppDataSource.getRepository(User);
export const getUser = async(id:string) =>{
  return await userRepository.findOne({
    where: {
      id,

    },
    relations:{
      contacts: true
    }
  })
}


const createUserService = async (userData: IUserRequest) => {
  const newUser = userRepository.create({...userData});
  

  await userRepository.save(newUser);
  return await getUser(newUser.id)
};

export default createUserService;