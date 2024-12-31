import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

// Basic placeholder component
const PlaceholderComponent = () => {
  return <div>Hello, World!</div>;
};

describe("PlaceholderComponent", () => {
  it("should render without crashing", () => {
    render(<PlaceholderComponent />);
    const element = screen.getByText("Hello, World!");
    expect(element).toBeInTheDocument();
  });
});