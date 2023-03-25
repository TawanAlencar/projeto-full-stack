import "express-async-errors"
import "reflect-metadata"
import express from "express"
import { userRouter } from "./routers/users.routers"
import { errorHandler } from "./errors/handle.error"
import { loginRouter } from "./routers/login.routers"
import { contactRouter } from "./routers/contacts.routers"




const app = express()
app.use(express.json())
app.use("/user", userRouter);
app.use("/login",loginRouter)
app.use("/contact",contactRouter)
app.use(errorHandler)

export default app