import { AppDataSource } from "../../data-source";

import "express-async-errors";
import { Contacts } from "../../entities/contacts.entities";
import { IContacts } from "../../interfaces/contacts";

const listContactsService = async (): Promise<IContacts[]> => {
  const contactsRepository = AppDataSource.getRepository(Contacts);

  return await contactsRepository.find({
    select: ["id", "name", "email", "phone", "createdAt", "updatedAt"],
    relations: {
      user: true,
    },
  });
};

export default listContactsService;
