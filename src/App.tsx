import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { v4 } from "uuid";
import { FirebaseProvider, BreakpointProvider } from "@contexts";
import { Platform } from "./layouts/Platform";
import { theme } from "./theme";
import './locates';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <FirebaseProvider>
        <BreakpointProvider>
          <Router>
            <Platform key={v4()} />
          </Router>
        </BreakpointProvider>
      </FirebaseProvider>
    </ChakraProvider>
  )
}

export default App
