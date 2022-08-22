import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { v4 } from "uuid";
import { Platform } from "./layouts/Platform";
import { theme } from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Platform key={v4()} />
      </Router>
    </ChakraProvider>
  )
}

export default App
