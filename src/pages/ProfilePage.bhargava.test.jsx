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

  // it("posts a lost item then deletes it and ensures its no longer there on your profile page", () => {
  //   // input logic harder test here
  //   useDbData.mockReturnValue([mockData, null]);
  //   useDbUpdate.mockReturnValue([null, null]);
  //   useAuth.mockReturnValue(mockUser);

  //   render(<PostPage />);

  //   const nameInput = screen.getByLabelText("Name:");
  //   const descriptionInput = screen.getByLabelText("Description:");
  //   const contactInfoInput = screen.getByLabelText("Contact Info:");
  //   const locationInput = screen.getByLabelText("Location Found/Lost:");
  //   const submitButton = screen.getByText("Submit");

  //   fireEvent.change(nameInput, { target: { value: "BIG TEST" } });
  //   fireEvent.change(descriptionInput, {
  //     target: { value: "Future Deleted Item" },
  //   });
  //   fireEvent.change(contactInfoInput, {
  //     target: { value: "john.doe@example.com" },
  //   });
  //   fireEvent.change(locationInput, { target: { value: "Location" } });

  //   fireEvent.click(submitButton);
  //   // The code above builds the post...

  //   // Write code that deletes the post from the profile page then checks the lost page to make sure it doesnt exist
    
  // })
});
