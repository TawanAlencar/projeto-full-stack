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
} from "@chakra-ui/react";

export const Cards = () => {
  const { contacts, setContacts } = useContextFunction();

  return (
    <>
      <UnorderedList
        display={"flex"}
        flexDirection="column"
        justifyContent={"flex-start"}
        m="0"
      >
        <Heading color={"white"} fontSize="25px">
          Lista de Contatos
        </Heading>
        <Flex>
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
                  ></IconButton>
                  <IconButton
                    bg="transparent"
                    aria-label="delete"
                    icon={<DeleteIcon />}
                    color="red"
                    _hover={{ background: "transparent" }}
                  ></IconButton>
                </Box>
              </Flex>
            </ListItem>
          ))}
        </Flex>
      </UnorderedList>
    </>
  );
};
