import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Cards } from "@/components/Cards";
import InputMask from "react-input-mask";
import { Header } from "../Header";
import { styleInputMask } from "../Register";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContextFunction } from "@/contexts/auth.contexts";
import { useEffect } from "react";


export const MainDashboard = () => {
  
  const { openContact, setOpenContact, addContacts, removeToken ,getToken,router} =
    useContextFunction();

  useEffect(()=>{
    const token = getToken()
    if(!token){
      router.push("/")
    }
  },[getToken, router])


  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    name: yup.string().required("Nome obrigatório").min(1),
    phone: yup.string().required("Telefone obrigatório"),
  });

  type errors = {
    name: string;
    email: string;
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
      <Flex
        direction={"column"}
        w={"100%"}
        h="100vh"
        bgImage={"./bg.jpg"}
        minW={"320px"}
        gap="20px"
      >
        <Header>
          <Button
            color={"white"}
            border="solid 1px white"
            bg={"transparent"}
            p="8px"
            _hover={{ background: "#081329" }}
            fontSize="15px"
            onClick={() => removeToken()}
          >
            Sair
          </Button>
        </Header>
        <Flex
          w={"100%"}
          h="100%"
          p={{
            base: "5px 10px",
            sm: "5px 20px",
            md: "5px 20px",
            lg: "5px 40px",
          }}
        >
          <Flex w="100%" direction={"column"} justify="flex-start">
            <Flex>
              <Heading color={"white"} w="100%" h="80px" fontSize="25px">
                Bem vindo, adicione contatos a sua conta
              </Heading>

              <Button
                color={"white"}
                border="solid 1px white"
                bg={"transparent"}
                p="15px"
                _hover={{ background: "#081329" }}
                fontSize="15px"
                fontWeight={"bold"}
                onClick={() => setOpenContact(true)}
              >
                +
              </Button>
            </Flex>

            <Modal isOpen={openContact} onClose={() => setOpenContact(false)}>
              <ModalOverlay />
              <ModalContent bg="#000000ed" border={"1px solid white"}>
                <ModalHeader color="white">Adicionar Contato</ModalHeader>
                <ModalCloseButton color={"white"} />
                <ModalBody
                  display="flex"
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <FormControl
                    as={"form"}
                    isInvalid={
                      errors.name || errors.email || errors.phone ? true : false
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
                      <FormErrorMessage>
                        {errors.name?.message}
                      </FormErrorMessage>
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
                      <FormErrorMessage>
                        {errors.email?.message}
                      </FormErrorMessage>
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
                      <FormErrorMessage>
                        {errors.phone?.message}
                      </FormErrorMessage>
                    </Box>
                  </FormControl>
                </ModalBody>

                <ModalFooter display={"flex"} gap="20px">
                  <Button
                    bg="blue"
                    color={"white"}
                    _hover={{ background: "#081329" }}
                    onClick={handleSubmit(addContacts)}
                  >
                    Adicionar
                  </Button>

                  <Button
                    bg="red"
                    color="white"
                    mr={3}
                    onClick={() => setOpenContact(false)}
                    _hover={{ background: "#ff0000a9" }}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Cards/>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
