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
  useDisclosure,
  FormControl,
	FormErrorMessage,
	FormLabel,
	Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { submitLogin } = useContextFunction();

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "A senha deve possuir no mínimo 8 caracteres, ter no mínimo uma letra maiscúla e uma letra minuscúla e um caractere especial"
      ),
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
        onClick={onOpen}
        color={"white"}
        border="solid 1px white"
        bg={"transparent"}
        p="8px"
        _hover={{ background: "#081329" }}
        fontSize="12px"
      >
        Login
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="#000000b9"
          border={"1px solid white"}
          p="10px"
          gap={"10px"}
        >
          <ModalHeader color="white">Login</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl isInvalid={!!errors.email}>
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
              onClick={onClose}
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


