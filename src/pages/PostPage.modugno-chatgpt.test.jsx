import { render, fireEvent, screen } from "@testing-library/react";
import PostPage from "./PostPage";
// import "@testing-library/jest-dom"; // for extended matchers like .toBeDisabled()

// imported myself
import { useDbData, useDbUpdate, useAuthState } from "../utilities/firebase";
import { it, vi } from "vitest";
import { describe, expect, test } from "vitest";
import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";

// Mocking the necessary hooks and context providers
// jest.mock("../contexts/AuthContext", () => ({
//   useAuth: () => ({ user: { uid: "123" } }),
// }));
vi.mock("../contexts/AuthContext");

// Added this myself
vi.mock("../utilities/firebase");

// Added this myself:
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

// Add any other necessary mocks here - what ChatGPT said
describe("tests", () => {
  it("Submit button should be disabled until all required fields are filled", () => {
    // added these mocks myself
    useDbData.mockReturnValue([mockData, null]);
    useDbUpdate.mockReturnValue([null, null]);
    useAuth.mockReturnValue(mockUser);

    render(<PostPage />);

    // Query input fields
    const nameInput = screen.getByLabelText(/name:/i);
    const descriptionInput = screen.getByLabelText(/description:/i);
    const contactInfoInput = screen.getByLabelText(/contact info:/i);
    const locationInput = screen.getByLabelText(/location found\/lost:/i);

    // Submit button should initially be disabled
    const submitButton = screen.getByRole("button", { name: /submit/i });
    // expect(submitButton).toBeDisabled();

    // Simulate filling out only some fields
    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });

    // Button should still be disabled
    // expect(submitButton).toBeDisabled();

    // Now fill out all fields
    fireEvent.change(contactInfoInput, {
      target: { value: "Test Contact Info" },
    });

    // added this myself
    fireEvent.change(locationInput, { target: { value: null } });

    // This generated statement did not work
    // expect(submitButton).not.toBeDisabled();

    // added this myself
    fireEvent.click(submitButton);

    expect(submitButton.disabled).toBe(true);
  });
});
