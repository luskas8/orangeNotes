import { Box, Container } from "@chakra-ui/react"
import { Note } from "@contexts"
import removeHTMLTags from "@utils/removeHTMLTags"

export const NoteItem = (note: Note) => {
    return (
        <Box
            key={note.id}
            cursor={"pointer"}
            as="article"
            bg="gray.700"
            borderRadius="6px"
            padding="16px 14px"
            overflow="hidden"
            _hover={{ bg: "var(--chakra-colors-gray-600)" }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap="6px"
        >
            <Box>
                <Box
                    as="header"
                    fontSize="lg"
                    fontWeight="bold"
                    maxH="28px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                >
                    <Box as="h1">{note.title}</Box>
                </Box>
                <Box
                    as="main"
                    fontSize="12px"
                    overflow="hidden"
                    color="gray.400"
                    maxH="calc(158px - 27px - 28px - 17.25px)"
                >
                    {removeHTMLTags(note.content)}
                </Box>
            </Box>
            <Box
                as="footer"
                fontSize="11.5px"
                color="gray.500"
            >
                {note.timestamp}
            </Box>
        </Box>
    )
}
