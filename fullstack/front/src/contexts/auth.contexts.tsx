import api from "@/services/api";
import { toastAcess, toastError } from "@/services/toastify";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface IUserContext {
  submitRegister: (payload: IRegister) => Promise<void>;
  submitLogin: (payload: ILogin) => Promise<void>;
  addContacts: (payload: IContacts) => Promise<void>;
  openRegister: boolean;
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  openContact: boolean;
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
  removeToken: Function;
  contacts: IListContacts[];
  setContacts: React.Dispatch<SetStateAction<IListContacts[]>>;
  getToken: Function,
  router: AppRouterInstance

}

interface IUser {
  children: ReactNode;
}

interface IRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IContacts {
  name: string;
  email: string;
  phone: string;
}

interface IListContacts {
  id: string;
  email: string;
  name: string;
  phone: string;
  contacts: [
    {
      id: string;
      name: string;
      email: string;
      phone: string;
    }
  ];
}

export const UserContext = createContext<IUserContext>({} as IUserContext);
export const UserProvider = ({ children }: IUser) => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const router = useRouter();
  const { token } = parseCookies();
  const [contacts, setContacts] = useState<IListContacts[]>([]);

  const submitRegister = async (
    payload: IRegister 
  ): Promise<void> => {
    try {
      const { data } = await api.post("/user", payload);
      toastAcess("Cadastro Realizado com Sucesso");

      setOpenRegister(false);
      setOpenLogin(true);
      return data;
    } catch (error) {
      return toastError("Email ja existe");
    }
  };

  const removeToken = () => {
    if (token) {
      destroyCookie(null, "token");
      router.push("/");
    }
  };
  const getToken = ()=>{
    return token
  }

  const submitLogin = async (payload: ILogin): Promise<void> => {
    try {
      const { data } = await api.post("/login", payload);
      toastAcess("Login Realizado com Sucesso");
      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60, 
        path: "/", 
      });

      router.push("/dashboard");
    } catch (error) {
      toastError("Verifique seu email e senha");
    }
  };

  const addContacts = async (payload: IContacts): Promise<void> => {
    try {
      const { data } = await api.post("/contact", payload, {
        headers: { authorization: `Bearer ${token}` },
      });
      const findUser = await api.get("/user/profile",{
        headers: { authorization: `Bearer ${token}` },
      })
      console.log(findUser.data)
      setContacts(findUser.data.contacts)
      setOpenContact(false);
      toastAcess("Contato adicionado com sucesso");
      return data;
    } catch (error) {
      toastError("Algo de errado");
    }
  };


  return (
    <UserContext.Provider
      value={{
        submitLogin,
        submitRegister,
        openRegister,
        setOpenLogin,
        openLogin,
        setOpenRegister,
        openContact,
        setOpenContact,
        addContacts,
        removeToken,
        contacts,
        setContacts,
        getToken,
        router
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useContextFunction = () => {
  const contextUser = useContext(UserContext);
  return contextUser;
};
