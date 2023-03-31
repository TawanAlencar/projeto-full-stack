import { useContextFunction } from "@/contexts/auth.contexts";
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Login = () => {
  const { submitLogin, openLogin, setOpenLogin } = useContextFunction();

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
  });

  type errors = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<errors>({
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      <Button
        onClick={() => setOpenLogin(true)}
        color={"white"}
        border="solid 1px white"
        bg={"transparent"}
        p="8px"
        _hover={{ background: "#081329" }}
        fontSize="12px"
      >
        Login
      </Button>

      <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
        <ModalOverlay />
        <ModalContent bg="#000000d1" border={"1px solid white"}>
          <ModalHeader color="white">Login</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl
              isInvalid={errors.email || errors.password ? true : false}
            >
              <Box>
                <FormLabel color="white" htmlFor="email">
                  Email
                </FormLabel>

                <Input
                  id="email"
                  color="white"
                  placeholder="Digite aqui seu email"
                  type="email"
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </Box>
              <Box>
                <FormLabel color="white" htmlFor="senha">
                  Senha
                </FormLabel>
                <Input
                  id="password"
                  color="white"
                  placeholder="Digite aqui sua senha"
                  type={"password"}
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter display={"flex"} gap="20px">
            <Button
              bg="blue"
              color={"white"}
              _hover={{ background: "#081329" }}
              onClick={handleSubmit(submitLogin)}
            >
              Entre
            </Button>
            <Button
              bg="red"
              color="white"
              mr={3}
              onClick={() => setOpenLogin(false)}
              _hover={{ background: "#ff0000a9" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
