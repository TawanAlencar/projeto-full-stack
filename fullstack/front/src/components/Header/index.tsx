import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface Ichildren {
  children: React.ReactNode;
}

export const Header = ({ children }: Ichildren) => {
  return (
    <Flex
      as={"header"}
      w="100%"
      align="center"
      minW={"320px"}
      justify="space-between"
      p={{ base: "5px 10px", sm: "5px 20px", md: "5px 20px", lg: "5px 40px" }}
      m="0 auto"
      minH="80px"
      zIndex={"2"}
      border="2px solid #111111"
      bg="#111111"
      sx={{ boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.507)" }}
      position="relative"
    >
      <Flex w={"100%"} justify="space-between">
        <Heading color={"white"} textShadow={"2px 2px 5px"}>
          User Connect
        </Heading>
        <Flex justify={"space-between"} gap={5}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
