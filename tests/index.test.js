import Home from "../pages";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Home tests", () => {
    it('Renders title', () => {
        render(<Home />);
        expect(screen.getByText("Welcome to")).toBeInTheDocument();
    })
})