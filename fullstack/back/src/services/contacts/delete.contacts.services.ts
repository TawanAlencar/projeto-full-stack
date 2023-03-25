import { AppDataSource } from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";
import { IContacts} from "../../interfaces/contacts";

import { AppError } from "../../errors/app.errors";



const deleteContactsService = async (contactId: string): Promise<IContacts> => {
    const contactsRepository = AppDataSource.getRepository(Contacts);

    const findContacts= await contactsRepository.findOne({
        where: {
        id: contactId,
        },
    });

    if (findContacts.isActive === false) {
        throw new AppError("Contacts is not active",400);
    }

    const contacts = await contactsRepository.save({
        ...findContacts,
        isActive: false,
    });

    return contacts;
};

export default deleteContactsService;