import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../Header";
import { Login } from "../Login";
import { Register } from "../Register";

export const Main = () => {
  return (
    <Flex
      direction={"column"}
      w={"100%"}
      h="100vh"
      bgImage={"./bg.jpg"}
      minW={"320px"}
    >
      <Header>
        <Login />
        <Register />
      </Header>
      <Flex w={"100%"} h="100%" justify={"center"} align={"center"}>
        <Text w={"50%"} color={"white"} fontSize={"25px"}>
          Visualize todos os usuários ou contatos em uma lista para uma visão
          geral rápida.
        </Text>
      </Flex>
    </Flex>
  );
};
