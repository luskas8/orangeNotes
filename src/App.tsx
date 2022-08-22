import { ChakraProvider } from "@chakra-ui/react"
import { Platform } from "./layouts/Platform"
import { theme } from "./theme"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Platform />
    </ChakraProvider>
  )
}

export default App
