import { UpdateResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";

import { IContacts, IContactsUpdate } from "../../interfaces/contacts";

const updateContactsService = async (
  contactsData: IContactsUpdate,
  contactsId: string
): Promise<UpdateResult> => {
  const contactsRepository = AppDataSource.getRepository(Contacts);

  const findContacts = await contactsRepository.findOne({
    where: {
      id: contactsId,
    },
  });

  const updatedContacts = contactsRepository.update( contactsId,{
    ...findContacts,
    ...contactsData
  });


  return updatedContacts;
};

export default updateContactsService;
