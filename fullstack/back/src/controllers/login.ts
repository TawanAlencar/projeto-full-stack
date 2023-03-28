import { Request, Response } from "express";
import createLoginService from "../services/login/create.login.services";

const createLoginController = async (req: Request, res: Response) => {
  const userData = req.body;
  const token = await createLoginService(userData);
  return res.status(200).json({ token });
};

export { createLoginController };
