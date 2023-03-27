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
    FormControl
} from "@chakra-ui/react";

export const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
            <ModalCloseButton color={"white"}/>
            <ModalBody
                display="flex"
                flexDirection={"column"}
                alignItems={"center"}
            >
                <FormControl>
                    <Input color="white" placeholder="Digite aqui seu email" marginBottom={"20px"} type="email"/>
                    <Input color="white" placeholder="Digite aqui sua senha" type={"password"} />
                </FormControl>
                
            </ModalBody>

            <ModalFooter display={"flex"} gap="20px">
                <Button
                bg="blue"
                color={"white"}
                _hover={{ background: "#081329" }}
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
