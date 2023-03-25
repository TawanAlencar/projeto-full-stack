import { User } from "../../entities/user.entities";

declare global {
    namespace Express{
        interface Request{
            clientFound: User
        }
    }
}