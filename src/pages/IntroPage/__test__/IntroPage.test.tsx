import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import IntroPage from "../IntroPage";
import store from "src/store";

function renderWithContext(element: React.ReactElement) {
  return render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>
  );
}

describe("IntroPage", () => {
  it("Checking initial mount", () => {
    const { container } = renderWithContext(<IntroPage />);

    /* We should see a text containing `Name:` */
    expect(screen.getByText("Name:")).toBeInTheDocument();
    /* We should see an input of type text to get user's name */
    expect(container.querySelector("input[type=text]")).toBeInTheDocument();
    /** We should see our button in its initial state in the page */
    expect(screen.getByText("Ready!")).toBeInTheDocument();
  });

  it("Checking if the page doesn't allow empty values as name", async () => {
    renderWithContext(<IntroPage />);

    const button = screen.getByText("Ready!");
    fireEvent.click(button);

    await waitFor(() => {
      /* We should not see the `Welcome` message */
      expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
      /* We should see the error message telling the user to enter her/his name */
      expect(screen.getByText("Please enter your name")).toBeInTheDocument();
    });
  });

  it("Checking if user can successfully enter her/his name", async () => {
    const { container } = renderWithContext(<IntroPage />);

    const button = screen.getByText("Ready!");
    const input = container.querySelector("input[type=text]");
    fireEvent.change(input as Element, { target: { value: "Mostafa" } });
    fireEvent.click(button);

    await waitFor(() => {
      /* We should see a text containing `Welcome` */
      expect(screen.getByText(/Welcome/)).toBeInTheDocument();
      /* We should see a text containing user's name */
      expect(screen.getByText(/Mostafa/)).toBeInTheDocument();
      /* We should see the button with new title: `Play!` */
      expect(screen.getByText("Play!")).toBeInTheDocument();
    });
  });

  it("Checking if user can successfully edit her/his name after it got set", async () => {
    const { container } = renderWithContext(<IntroPage />);

    const button = screen.getByText("Ready!");
    const input = container.querySelector("input[type=text]");
    fireEvent.change(input as Element, { target: { value: "Mostafa" } });
    fireEvent.click(button);

    await waitFor(() => {
      const nameElement = screen.getByText(/Mostafa/);
      expect(nameElement).toBeInTheDocument();
      /* We should not see any input in our page at this moment */
      expect(
        container.querySelector("input[type=text]")
      ).not.toBeInTheDocument();
    });

    const nameElement = screen.getByText(/Mostafa/);
    fireEvent.click(nameElement);
    await waitFor(() => {
      const newInput = container.querySelector("input[type=text]");
      /* Now that we clicked on the username, we should see the input again */
      expect(newInput).toBeInTheDocument();
      /* And the input should contain user's name */
      expect(newInput).toHaveAttribute("value", "Mostafa");
    });
  });
});
