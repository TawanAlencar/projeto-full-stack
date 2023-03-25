import { Box,  Flex} from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { Login } from "../Login";
import { Register } from "../Register";




export const Main = () => {
  
  return (
    <Box w={"100%"} h="100vh"  bgImage={"./bg.jpg"}  minW={"320px"}>
        <Header>
          <Login/>  
          <Register/>
        </Header>
        <Flex w={"100%"} h="100vh" justify={"center"} align={"center"}>
        </Flex>
    </Box>
  );
};
