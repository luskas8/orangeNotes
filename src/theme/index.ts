import { extendTheme } from "@chakra-ui/react"

const customTheme = {
    styles: {
        global: {
            svg: {
                width: "100%",
                height: "100%"
            }
        }
    }
}
export const theme = extendTheme(customTheme)