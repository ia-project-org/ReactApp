import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"; // To simulate routes in tests
import App from "./App";

describe("App Component", () => {
  it("should render the Login component for the root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}> {/* Simulate the "/" route */}
        <App />
      </MemoryRouter>
    );
  });
});
