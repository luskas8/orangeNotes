import { ChakraProvider } from "@chakra-ui/react"
import { v4 } from "uuid"
import { Platform } from "./layouts/Platform"
import { theme } from "./theme"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Platform key={v4()} />
    </ChakraProvider>
  )
}

export default App
