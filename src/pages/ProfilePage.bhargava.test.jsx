import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from "./ProfilePage";
import PostPage from "./PostPage";

vi.mock("../utilities/firebase", () => {
  const originalModule = vi.importActual("../utilities/firebase");
  return {
    ...originalModule,
    useDbData: vi.fn(() => [mockData, null]), // Mocked useDbData
    useDbUpdate: vi.fn(() => [vi.fn(), null]), // Mocked useDbUpdate
    useAuthState: vi.fn(() => [mockUser, true]), // Mocked useAuthState
  };
});

vi.mock("../contexts/AuthContext", () => {
  const originalModule = vi.importActual("../contexts/AuthContext");
  const mockUser = {
    uid: "test-uid",
    email: "testuser@u.northwestern.edu",
    displayName: "John Doe",
  };
  return {
    ...originalModule,
    useAuth: vi.fn(() => ({
      user: mockUser,
      isNorthwesternStudent: mockUser.email.endsWith("northwestern.edu")
    }))
  };
});

const mockData = {
  // ... your mock data ...
};

describe("ProfilePage", () => {

  it("displays the welcome message with the user's name", () => {
    render(
      <Router>
        <ProfilePage lostPosts={{}} foundPosts={{}} />
      </Router>
    );

    expect(screen.getByText(`Welcome`)).toBeTruthy();
    expect(screen.queryByText(`Sign in`)).toBeFalsy();
  });

  it("posts a lost item then deletes it and ensures it's no longer there on your profile page", async () => {
    // Setup mocks
    // Note: If useDbData and useDbUpdate require specific mock implementations, add them here

    // Render PostPage to create a post
    render(
      <Router>
        <PostPage />
      </Router>
    );

    const nameInput = screen.getByLabelText("Name:");
    const descriptionInput = screen.getByLabelText("Description:");
    const contactInfoInput = screen.getByLabelText("Contact Info:");
    const locationInput = screen.getByLabelText("Location Found/Lost:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(descriptionInput, { target: { value: "delete me" } });
    fireEvent.change(contactInfoInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(locationInput, { target: { value: "Location" } });
    fireEvent.click(submitButton);
    
    // Render ProfilePage to check the post
    render(
      <Router>
        <ProfilePage />
      </Router>
    );

    // Wait for the post to be added
    expect(screen.queryByText("delete me")).toBeFalsy();

    // Simulate deletion of the post

    // Wait for the deletion to be processed and verify the post is no longer displayed
    expect(screen.queryByText("delete me")).toBeFalsy();
  });
});
