import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PostPage from "./PostPage";
import { it, vi } from "vitest";
import { useDbData, useDbUpdate, useAuthState } from "../utilities/firebase";
import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";

vi.mock("../utilities/firebase");
vi.mock("../contexts/AuthContext");

const mockUser = {
  uid: "test-uid",
  email: "testuser@northwestern.edu",
};

const mockNonNorthwesternUser = {
  uid: "test-uid",
  email: "testuser@example.com",
};

const mockData = {
  foundPosts: {
    1697653581919: {
      contactInfo: "8478147947",
      description: "Water bottle",
      hidden: false,
      id: 1697653581919,
      image:
        "https://firebasestorage.googleapis.com/v0/b/lostnfound-c4ccf.appspot.com/o/C%3A%5Cfakepath%5Cwaterbottle.JPG?alt=media&token=32c34369-acea-498a-8a60-173e7e1af743",
      location: "Tech Auditorium",
      lostOrFound: "found",
      name: "Alex Modugno",
      uid: "9NgmBelwvrdbN67HfZjWdEKtUVV2",
    },
  },
  lostPosts: {
    1697673281449: {
      contactInfo: "8471238890",
      description: "Charger",
      hidden: false,
      id: 1697673281449,
      image:
        "https://firebasestorage.googleapis.com/v0/b/lostnfound-c4ccf.appspot.com/o/C%3A%5Cfakepath%5CIMG_2553.JPG?alt=media&token=742439ac-2415-47ed-9710-12a94707ff78",
      location: "Kresge",
      lostOrFound: "lost",
      name: "John King",
      uid: "9NgmBelwvrdbN67HfZjWdEKtUVV2",
    },
  },
  users: {
    "77U9GhbcXTSSUSSepq9YoyM2nOQ2": {
      email: "youssefibrahim603@gmail.com",
      name: "Youssef Ibrahim",
      uid: "77U9GhbcXTSSUSSepq9YoyM2nOQ2",
    },
  },
};

describe("basic tests", () => {
  it("Submit button should not work when not all required inputs are filled out - no location", () => {
    // these values can be null because this test does not test database functionality
    useDbData.mockReturnValue([mockData, null]);
    useDbUpdate.mockReturnValue([null, null]);
    useAuth.mockReturnValue(mockUser);
    render(<PostPage />);

    const nameInput = screen.getByLabelText("Name:");
    const descriptionInput = screen.getByLabelText("Description:");
    const contactInfoInput = screen.getByLabelText("Contact Info:");
    const locationInput = screen.getByLabelText("Location Found/Lost:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Sample description" },
    });
    fireEvent.change(contactInfoInput, {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(locationInput, { target: { value: null } });

    fireEvent.click(submitButton);

    expect(submitButton.disabled).toBe(true);
  });

  it("Submit button should work when all required inputs are there, but image is not since it's optional", () => {
    // these values can be null because this test does not test database functionality
    useDbData.mockReturnValue([mockData, null]);
    useDbUpdate.mockReturnValue([null, null]);
    // useAuthState.mockReturnValue([
    //   { uid: "9NgmBelwvrdbN67HfZjWdEKtUVV2" },
    //   null,
    // ]);
    useAuth.mockReturnValue(mockUser);
    render(<PostPage />);

    const nameInput = screen.getByLabelText("Name:");
    const descriptionInput = screen.getByLabelText("Description:");
    const contactInfoInput = screen.getByLabelText("Contact Info:");
    const locationInput = screen.getByLabelText("Location Found/Lost:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Sample description" },
    });
    fireEvent.change(contactInfoInput, {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(locationInput, { target: { value: "Location" } });

    fireEvent.click(submitButton);

    expect(submitButton.disabled).toBe(false);
  });
});
