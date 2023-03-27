import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entities";
import { IUser } from "../../interfaces/users";
import "express-async-errors"
import jwt from "jsonwebtoken"

const listProfileService = async (token:string) => {
    const userRepository = AppDataSource.getRepository(User);
    token = token.split(" ")[1];
    const {sub} = jwt.decode(token)
    
    

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
        },
        where:{
            id:String(sub)
        }
    })
};

export default listProfileService;