import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listProfileController,
  listUsersController,
  updateUserController,
} from "../controllers/users";
import authUserMiddleware from "../middlewares/auth.user.middleware";
import emailExistsMiddleware from "../middlewares/verify.email.middleware";
import { verifyErrorMiddleware } from "../middlewares/verify.error.middleware";
import { userSerializer } from "../serializers/users/users.schema";

export const userRouter = Router();

userRouter.post(
  "/",
  verifyErrorMiddleware(userSerializer),
  emailExistsMiddleware,
  createUserController
);
userRouter.get("/", authUserMiddleware, listUsersController);
userRouter.get("/profile",authUserMiddleware,listProfileController)
userRouter.delete("/:id", authUserMiddleware, deleteUserController);
userRouter.patch("/:id", authUserMiddleware, updateUserController);
