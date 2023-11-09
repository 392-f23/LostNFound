import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import ProfilePage from "./ProfilePage";
import { useAuth } from "../contexts/AuthContext";

vi.mock("../utilities/firebase");
vi.mock("../contexts/AuthContext");

const mockUser = {
  uid: "test-uid",
  email: "testuser@u.northwestern.edu",
  displayName: "Test User",
};

describe("ProfilePage", () => {
  it("displays the welcome message with the user's name", () => {
    // Mock the useAuth hook to return the mock user
    useAuth.mockReturnValue({ user: mockUser });

    // Wrap the ProfilePage component in a Router for the test
    render(
      <Router>
        <ProfilePage lostPosts={{}} foundPosts={{}} />
      </Router>
    );

    // Check if the welcome message with the user's name is in the document
    expect(screen.getByText(`Welcome`)).toBeTruthy();
    expect(screen.queryByText(`Sign in`)).toBeFalsy();

  });
});
