import { Box, Flex, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchProps {
    placeholderText: string;
    value: string;
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({ placeholderText, value, handleOnChange }: SearchProps) => {
    return (
        <label
            htmlFor="orangeNote-input--search"
        >
            <Box
                width="100%"
                maxWidth={{ md: "350px" }}
                padding="0.5rem 1rem"
                color="chakra-placeholder-color"
            >
                <Flex
                    bgColor="whiteAlpha.50"
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius="12px"
                    padding="0 8px"
                    gap={"8px"}
                >
                    <Box
                        width="16px"
                        height="16px"
                    >
                        <BiSearch />
                    </Box>
                    <Input
                        fontSize={"sm"}
                        id="orangeNote-input--search"
                        padding={0}
                        color="white"
                        placeholder={placeholderText}
                        value={value}
                        onChange={handleOnChange}
                        border="none"
                        bgColor="transparent"
                        _focusVisible={{}}
                    />
                </Flex>
            </Box>
        </label>
    )
}
