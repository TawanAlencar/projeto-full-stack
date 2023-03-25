import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface Ichildren {
    children: React.ReactNode;
}

export const Header = ({ children }: Ichildren) => {


    return (
        <Flex
        as={"header"}
        w="100vw"
        align="center"
        minW={"320px"}
        justify="space-between"
        p={{ base: "5px 10px", sm: "5px 20px", md: "5px 20px", lg: "5px 40px" }}
        m="0 auto"
        minH="80px"
        zIndex={"2"}
        bg="#111111"
        sx={{ boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.507)" }}
        position="fixed"
        >
        <Flex w={"100%"} justify="space-between">
            <Heading color={"white"}>FULLSTACK</Heading>
            <Flex justify={"space-between"} gap={5}>
            {children}
            </Flex>
        </Flex>
        </Flex>
    );
};
