import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest"
import App from './App'

it("should render App with text Hello World!", () => {
    render(<App />);
});