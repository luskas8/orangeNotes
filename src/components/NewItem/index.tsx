import { Box, Button } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface NewItemProps {
    to: string;
}

export const NewItem = ({ to }: NewItemProps) => {
    const navigatate = useNavigate();

    function handleNewNote() {
        navigatate(to);
    }

    return (
        <Box
            position="absolute"
            boxSize={{base: "56px", md: "48px"}}
            bottom={{base: "56px"}}
            top={{md: "8px"}}
            right={{base: "24px", md: "32px"}}
            borderRadius="50px"
            color={"orange.600"}
        >
            <Button
                onClick={handleNewNote}
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
