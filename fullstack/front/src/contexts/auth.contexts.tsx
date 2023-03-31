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
  contacts: IFindContacts[];
  setContacts: React.Dispatch<SetStateAction<IFindContacts[]>>;
  getToken: Function;
  router: AppRouterInstance;
  token: string;
  removeContacts: (id: string) => Promise<void>;
  user: IFindUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IFindUser | undefined>>;
  openEdit: boolean;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  updateContacts: (payload: IContactsUpdate, id: string) => Promise<void>;
  currentContact: IFindContacts  | undefined;
  setCurrentContact: React.Dispatch<SetStateAction<IFindContacts | undefined>>
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

interface IFindContacts{
  id: string;
  email: string;
  name: string;
  phone: string;
  user: 
    {
      id: string;
      name: string;
      email: string;
      phone: string;
    }
  
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

interface IFindUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  contacts:[
    {
      id: string;
      name: string;
      email: string;
      phone: string;
    }
  ];
}

interface IContactsUpdate {
  name?: string;
  email?: string;
  phone?: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);
export const UserProvider = ({ children }: IUser) => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const router = useRouter();
  const { token } = parseCookies();
  const [contacts, setContacts] = useState<IFindContacts[]>([]);
  const [user, setUser] = useState<IFindUser>();
  const [openEdit, setOpenEdit] = useState(false);
  const [currentContact, setCurrentContact] = useState<IFindContacts>()



  const submitRegister = async (payload: IRegister): Promise<void> => {
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
  const getToken = () => {
    return token;
  };

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
      const findUser = await api.get("/user/profile", {
        headers: { authorization: `Bearer ${token}` },
      });

      setContacts(findUser.data.contacts);
      setOpenContact(false);
      toastAcess("Contato adicionado com sucesso");
      return data;
    } catch (error) {
      toastError("Algo de errado");
    }
  };
  
  const removeContacts = async (id: string): Promise<void> => {
    
      const { data } = await api.delete(`/contact/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      
      toastAcess("Contato deletado com sucesso");
      return data;
   
  };

  const updateContacts = async (
    payload: IContactsUpdate,
    id: string
  ): Promise<void> => {
    try {
      const { data } = await api.patch(`/contact/${id}`, payload, {
        headers: { authorization: `Bearer ${token}` },
      });
    
      setContacts([...contacts,data]);
      setOpenEdit(false);
      toastAcess("Contato atualizado com sucesso");
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
        router,
        token,
        removeContacts,
        user,
        setUser,
        openEdit,
        setOpenEdit,
        updateContacts,
        currentContact,
        setCurrentContact
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
