import { Box, Button, Flex, Input, ScaleFade, useDisclosure } from "@chakra-ui/react";
import addTask from "@services/firebase/tasks/add";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

interface NewItemProps {
    to: string;
}

export const NewItem = ({ to }: NewItemProps) => {
    const navigatate = useNavigate();

    function handleNewItem() {
        navigatate(to);
    }

    return (
        <Box
            position="absolute"
            boxSize={{ base: "56px", md: "48px" }}
            bottom={{ base: "56px" }}
            top={{ md: "8px" }}
            right={{ base: "24px", md: "32px" }}
            borderRadius="50px"
            color={"orange.600"}
        >
            <Button
                onClick={handleNewItem}
                borderRadius="inherit"
                boxSize={"100%"}
                _hover={{
                    color: "gray.100",
                    bg: "orange.600",
                }}
            >
                <HiOutlinePlus />
            </Button>
        </Box>
    )
}


NewItem.Task = () => {
    const [content, updateContent] = useState<string>("");
    const [clickedCancel, updateState] = useState<boolean>(false);
    const { isOpen, onToggle } = useDisclosure();

    const createItem = async () => {
        await addTask({ completed: false, content })
        updateContent("")
        onToggle();
    }

    return (
        <Box
            width={{ md: "425px" }}
            padding="6px 0"
            margin={{ base: "0.5rem 1rem 0 1rem", md: "0.5rem auto 0 auto" }}
            position="relative"
        >
            <ScaleFade in={isOpen} unmountOnExit={true} delay={{ enter: 0.400 }}>
                <Flex zIndex={2} color="white" gap="6px">
                    <Button
                        boxSize="40px"
                        padding="0.5rem"
                        type="button"
                        bg="red.700"
                        _hover={{
                            bg: "var(--chakra-colors-red-600)"
                        }}
                        onClick={() => { onToggle(); updateState(true); }}
                    >
                        <VscClose />
                    </Button>
                    <Input
                        _focusVisible={{}}
                        border="none"
                        borderRadius={0}
                        borderBottom="1px solid"
                        borderBottomColor="gray.700"
                        padding="0 0.5rem"
                        value={content}
                        onChange={e => updateContent(e.target.value)}
                    />
                    <Button
                        boxSize="40px"
                        padding="0.5rem"
                        type="submit"
                        bg="whatsapp.700"
                        _hover={{
                            bg: "var(--chakra-colors-whatsapp-600)"
                        }}
                        onClick={createItem}
                    >
                        <BiCheck />
                    </Button>
                </Flex>
            </ScaleFade>
            <ScaleFade initialScale={0.9} unmountOnExit={true} in={!isOpen} delay={{ enter: clickedCancel ? 0.400 : 0 }}>
                <Box
                    cursor="pointer"
                    height="40px"
                    border="1px solid"
                    borderColor="gray.700"
                    borderRadius="1rem"
                    onClick={onToggle}
                    color="gray.700"
                    _hover={{
                        borderColor: "var(--chakra-colors-gray-600)",
                        color: "var(--chakra-colors-gray-600)"
                    }}
                >
                    <HiOutlinePlus size={40} />
                </Box>
            </ScaleFade>
        </Box>
    )
}
