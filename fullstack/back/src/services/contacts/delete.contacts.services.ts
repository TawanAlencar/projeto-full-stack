import { AppDataSource } from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";



const deleteContactsService = async (contactId: string) => {
    const contactsRepository = AppDataSource.getRepository(Contacts);

    const contacts = await contactsRepository.delete(contactId)

    return contacts
};

export default deleteContactsService;