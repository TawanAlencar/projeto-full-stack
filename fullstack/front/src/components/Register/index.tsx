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
import { useContextFunction } from "@/contexts/auth.contexts";
import InputMask from "react-input-mask";


export const styleInputMask = {
  width: "100%",
  backgroundColor: "inherit",
  border: "1px solid",
  borderColor: "inherit",
  height: "var(--chakra-sizes-10)",
  borderRadius: "var(--chakra-radii-md)",
  padding: "0 1rem",
  color: "white",
};
export const Register = () => {
  const { submitRegister, setOpenRegister, openRegister } =
    useContextFunction();

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "A senha deve possuir no mínimo 8 caracteres, ter no mínimo uma letra maiscúla e uma letra minuscúla e um caractere especial"
      ),
    name: yup.string().required("Nome obrigatório").min(1),
    phone: yup.string().required("Telefone obrigatório"),
  });

  type errors = {
    name: string;
    email: string;
    password: string;
    phone: string;
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
        onClick={() => setOpenRegister(true)}
        color={"white"}
        border="solid 1px white"
        bg={"transparent"}
        p="8px"
        _hover={{ background: "#081329" }}
        fontSize="12px"
      >
        Cadastro
      </Button>

      <Modal isOpen={openRegister} onClose={() => setOpenRegister(false)}>
        <ModalOverlay />
        <ModalContent bg="#000000ed" border={"1px solid white"}>
          <ModalHeader color="white">Cadastro</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl
              as={"form"}
              isInvalid={
                errors.name ||
                errors.password ||
                errors.email ||
                errors.phone
                  ? true
                  : false
              }
              display="flex"
              flexDirection={"column"}
              gap="20px"
            >
              <FormLabel color="white" htmlFor="name">
                Nome
              </FormLabel>
              <Box>
                <Input
                  id="name"
                  color="white"
                  placeholder="Digite aqui seu nome completo"
                  {...register("name")}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </Box>
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
              <Box>
                <FormLabel color="white" htmlFor="name">
                  Telefone
                </FormLabel>
                <InputMask
                  mask={"(99) 99999-9999"}
                  id="phone"
                  style={styleInputMask}
                  placeholder="Digite aqui seu numero de telefone"
                  {...register("phone")}
                />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter display={"flex"} gap="20px">
            <Button
              bg="blue"
              color={"white"}
              _hover={{ background: "#081329" }}
              onClick={handleSubmit(submitRegister)}
            >
              Cadastrar
            </Button>
            <Button
              bg="red"
              color="white"
              mr={3}
              onClick={() => setOpenRegister(false)}
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
