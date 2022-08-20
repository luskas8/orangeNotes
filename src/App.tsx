import { ChakraProvider } from "@chakra-ui/react"
import { Platform } from "./layouts/Platform"

function App() {
  return (
    <ChakraProvider>
      <Platform />
    </ChakraProvider>
  )
}

export default App
