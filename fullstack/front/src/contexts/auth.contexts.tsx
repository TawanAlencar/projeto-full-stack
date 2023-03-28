import api from "@/services/api";
import { toastAcess, toastError } from "@/services/toastify";
import { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from "nookies";

interface IUserContext {
  submitRegister: (payload: IRegister) => Promise<void>;
  submitLogin:(payload:ILogin)=> Promise<void>
}

interface IUser {
  children: ReactNode;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);
export const UserProvider = ({ children }: IUser) => {
  
  const router = useRouter()

  const submitRegister = async (payload: IRegister): Promise<void> => {
    try {
      const { data } = await api.post("/user", payload);
      toastAcess("Cadastro Realizado com Sucesso");
      return data;

    } catch (error) {
    
      return toastError("Verifique novamente todos os dados");
    }
  }
  const submitLogin = async (payload: ILogin): Promise<void> => {
    try {
      const { data } = await api.post("/login", payload);
      toastAcess("Login Realizado com Sucesso");
  
      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60, // tempo de expiração do cookie (30 dias)
        path: "/", // caminho no qual o cookie será válido
      });
      router.push("/dashboard")
     
    } catch (error) {
      toastError("Verifique seu email e senha");
    }
  };

  
  return (
    <UserContext.Provider
      value={{
        submitLogin,
        submitRegister
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
