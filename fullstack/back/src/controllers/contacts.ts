import { Request, Response } from "express";
import createContactService from "../services/contacts/create.contacts.services";
import deleteContactsService from "../services/contacts/delete.contacts.services";
import listContactsService from "../services/contacts/list.contacts.services";
import updateContactsService from "../services/contacts/update.contacts.services";




export const createContactController = async (req: Request, res: Response) => {
  const contactData = req.body;
  const newContact = await createContactService(contactData,req.clientFound);
  return res.status(201).json(newContact);
};

export const listContactsController = async (req: Request, res: Response) => {
  const contacts = await listContactsService();
  return res.status(200).json(contacts);
};

export const deleteContactsController = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  const deletedContact = await deleteContactsService(contactId);
  return res.status(204).json(deletedContact);
};

export const updateContactsController = async (req: Request, res: Response) => {
  const contactsData = req.body;
  const contactsId = req.params.id;
  const updatedContacts = await updateContactsService(contactsData, contactsId);
  return res.status(200).json(updatedContacts);
};