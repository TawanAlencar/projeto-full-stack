import { useContextFunction } from "@/contexts/auth.contexts";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Heading,
  UnorderedList,
  ListItem,
  Flex,
  Text,
  Box,
  IconButton,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export const Cards = () => {
  const {
    contacts,
    setContacts,
    removeContacts,
    openEdit,
    setOpenEdit,
    updateContacts,
  } = useContextFunction();

  const formSchema = yup.object().shape({
    email: yup.string().email(),
    name: yup.string(),
    phone: yup.string(),
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
      <UnorderedList
        display={"flex"}
        flexDirection="column"
        justifyContent={"flex-start"}
        m="0"
        h="700px"
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            background: "mediumspringgreen",
            borderRadius: "24px",
          },
        }}
      >
        <Heading color={"white"} fontSize="25px">
          Lista de Contatos
        </Heading>
        <Flex direction={"column"}>
          {contacts.map((e) => (
            <ListItem
              key={e.id}
              w="100%"
              borderBottom={"1px solid white"}
              marginTop="20px"
              listStyleType={"none"}
            >
              <Flex w="100%" justify={"space-between"}>
                <Flex gap="20px">
                  <Box>
                    <Text
                      color={"facebook.100"}
                      maxW="200px"
                      whiteSpace={"nowrap"}
                      overflow="hidden"
                      textOverflow={"ellipsis"}
                    >
                      {e.name}
                    </Text>
                    <Text
                      color={"facebook.300"}
                      maxW="200px"
                      whiteSpace={"nowrap"}
                      overflow="hidden"
                      textOverflow={"ellipsis"}
                    >
                      {e.phone}
                    </Text>
                    <Text
                      color={"facebook.100"}
                      w="200px"
                      whiteSpace={"nowrap"}
                      overflow="hidden"
                      textOverflow={"ellipsis"}
                    >
                      {e.email}
                    </Text>
                  </Box>
                </Flex>

                <Box>
                  <IconButton
                    bg="transparent"
                    color="blue"
                    aria-label="edit"
                    icon={<EditIcon />}
                    _hover={{ background: "transparent" }}
                    onClick={() => setOpenEdit(true)}
                  ></IconButton>
                  <IconButton
                    bg="transparent"
                    aria-label="delete"
                    icon={<DeleteIcon />}
                    color="red"
                    _hover={{ background: "transparent" }}
                    onClick={() => removeContacts(e.id)}
                  ></IconButton>
                </Box>
              </Flex>
              <Modal isOpen={openEdit} onClose={() => setOpenEdit(false)}>
                <ModalOverlay />
                <ModalContent bg="#000000ed" border={"1px solid white"}>
                  <ModalHeader color="white">Editar Contato</ModalHeader>
                  <ModalCloseButton color={"white"} />
                  <ModalBody
                    display="flex"
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <FormControl
                      as={"form"}
                      isInvalid={
                        errors.name || errors.email || errors.phone
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
                          placeholder="Digite aqui o nome completo"
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
                        <Input
                          as={InputMask}
                          mask={"(99) 99999-9999"}
                          id="phone"
                          color="white"
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
                      onClick={handleSubmit((data) => {
                        updateContacts(data, e.id);
                      })
                      
                    }
                    >
                      Editar
                    </Button>

                    <Button
                      bg="red"
                      color="white"
                      mr={3}
                      onClick={() => setOpenEdit(false)}
                      _hover={{ background: "#ff0000a9" }}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </ListItem>
          ))}
        </Flex>
      </UnorderedList>
    </>
  );
};
