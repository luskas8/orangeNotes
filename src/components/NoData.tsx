import { Box, Center, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { RiEmotionSadLine } from "react-icons/ri";

interface NoDataProps {
    type: string
}

export const NoData = ({ type }: NoDataProps) => {
    const { t } = useTranslation('translation');
    return (
        <Box w="100%" padding="1.5rem">
            <Center borderRadius="6px">
                <Flex bg="gray.700" padding="2rem 4rem" direction="column" align="center" gap="2rem">
                    <Box boxSize="20">
                        <RiEmotionSadLine />
                    </Box>
                    {t('noData', { type: t(type) })}
                </Flex>
            </Center>
        </Box>
    )
}
