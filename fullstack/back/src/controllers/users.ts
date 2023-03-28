import { Request, Response } from "express";
import createUserService from "../services/users/create.users.services";
import deleteUserService from "../services/users/delete.users.services";
import listProfileService from "../services/users/list.profile.services";
import listUserService from "../services/users/list.users.services";
import updateUserService from "../services/users/update.users.services";

export const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

export const listUsersController = async (req: Request, res: Response) => {
  const user = await listUserService();
  return res.status(200).json(user);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await deleteUserService(userId);
  return res.sendStatus(204);
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  const userId = req.params.id;
  const updatedUser = await updateUserService(userData, userId);
  return res.status(200).json(updatedUser);
};

export const listProfileController = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const profile = await listProfileService(token);
  return res.status(200).json(profile);
};
