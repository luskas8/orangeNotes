import { Box, WrapItem } from "@chakra-ui/react"
import { Note } from "../../contexts"

export const NoteItem = (note: Note) => {
    return (
        <WrapItem flex={{ base: "1", md: "0" }} w={{ base: "100%" }} key={note.id}>
            <Box
                minW={"148px"}
                as="article"
                w={{ base: "100%", md: "230px" }}
                bg="gray.700"
                borderRadius="6px"
                padding="16px 14px"
            >
                <Box as="header" fontSize="lg" fontWeight="bold">
                    <Box as="h1">{note.title}</Box>
                </Box>
                <Box as="main" fontSize="12px" color="gray.400">
                    {note.content}
                </Box>
            </Box>
        </WrapItem>
    )
}
