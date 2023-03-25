import { AppDataSource } from "../../data-source";
import {  IContactRequest } from "../../interfaces/contacts";
import "express-async-errors"
import { Contacts } from "../../entities/contacts.entities";
import { User } from "../../entities/user.entities";


const contactRepository = AppDataSource.getRepository(Contacts);
export const getContact = async(id:string) =>{
  return await contactRepository.findOne({
    where: {
      id
    },
    relations:{
      user: true
    }
  })
}


const createContactService = async (contactData: IContactRequest,clientFound:User) => {
  const newContact = contactRepository.create({...contactData,user:clientFound});

  await contactRepository.save(newContact);
  
  return await getContact(newContact.id)
};

export default createContactService;