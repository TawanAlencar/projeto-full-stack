import { AppDataSource } from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";

import { IContacts, IContactsUpdate } from "../../interfaces/contacts";

const updateContactsService = async (
  contactsData: IContactsUpdate,
  contactsId: string
): Promise<IContacts> => {
  const contactsRepository = AppDataSource.getRepository(Contacts);

  const findContacts = await contactsRepository.findOne({
    where: {
      id: contactsId,
    },
  });

  const updatedContacts = contactsRepository.create({
    ...findContacts,
    ...contactsData,
  });

  await contactsRepository.save(updatedContacts);

  return updatedContacts;
};

export default updateContactsService;
