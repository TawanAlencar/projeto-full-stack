import { Router } from "express";
import {
  createContactController,
  deleteContactsController,
  listContactsController,
  updateContactsController,
} from "../controllers/contacts";
import authUserMiddleware from "../middlewares/auth.user.middleware";
import emailExistsMiddleware from "../middlewares/verify.email.middleware";

export const contactRouter = Router();

contactRouter.post(
  "/",
  authUserMiddleware,
  emailExistsMiddleware,
  createContactController
);
contactRouter.get("/", authUserMiddleware, listContactsController);
contactRouter.delete("/:id", authUserMiddleware, deleteContactsController);
contactRouter.patch("/:id", authUserMiddleware, updateContactsController);
