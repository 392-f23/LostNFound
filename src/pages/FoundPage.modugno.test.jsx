import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import FoundPage from "./FoundPage";
import SearchSort from "../components/SearchSort";
import { it, vi } from "vitest";
import { useDbData, useDbUpdate, useAuthState } from "../utilities/firebase";
import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";

vi.mock("../utilities/firebase");
vi.mock("../contexts/AuthContext");

const mockPosts = {
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
  1697653581920: {
    contactInfo: "8478147947",
    description: "Airpods",
    hidden: false,
    id: 1697653581920,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lostnfound-c4ccf.appspot.com/o/C%3A%5Cfakepath%5Cwaterbottle.JPG?alt=media&token=32c34369-acea-498a-8a60-173e7e1af743",
    location: "Tech Auditorium",
    lostOrFound: "found",
    name: "Alex Modugno",
    uid: "9NgmBelwvrdbN67HfZjWdEKtUVV2",
  },
  1697653581921: {
    contactInfo: "8478147947",
    description: "Books",
    hidden: false,
    id: 1697653581921,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lostnfound-c4ccf.appspot.com/o/C%3A%5Cfakepath%5Cwaterbottle.JPG?alt=media&token=32c34369-acea-498a-8a60-173e7e1af743",
    location: "Tech Auditorium",
    lostOrFound: "found",
    name: "Alex Modugno",
    uid: "9NgmBelwvrdbN67HfZjWdEKtUVV2",
  },
  1697653581922: {
    contactInfo: "8478147947",
    description: "Engineering books",
    hidden: false,
    id: 1697653581922,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lostnfound-c4ccf.appspot.com/o/C%3A%5Cfakepath%5Cwaterbottle.JPG?alt=media&token=32c34369-acea-498a-8a60-173e7e1af743",
    location: "Tech Auditorium",
    lostOrFound: "found",
    name: "Alex Modugno",
    uid: "9NgmBelwvrdbN67HfZjWdEKtUVV2",
  },
};

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
    1697653581924: {
      contactInfo: "8478147947",
      description: "Water bottle",
      hidden: false,
      id: 1697653581924,
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

describe("Search tests", () => {
  it("Inputting Airpods into the search bar generates posts with that descripton", () => {
    // these values can be null because this test does not test database functionality
    useDbData.mockReturnValue([mockData, null]);
    useDbUpdate.mockReturnValue([null, null]);
    useAuthState.mockReturnValue([mockUser, null]);
    useAuth.mockReturnValue(mockUser);
    render(<FoundPage posts={mockPosts} />);

    const searchInput = screen.getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "Airpods" } });

    const posts = screen.queryAllByText("Airpods");

    expect(posts.length).toBe(1);
  });

  it("Inputting Books into the search bar generates posts with that descripton, and does not make Airpods appear", async () => {
    // these values can be null because this test does not test database functionality
    useDbData.mockReturnValue([mockData, null]);
    useDbUpdate.mockReturnValue([null, null]);
    useAuthState.mockReturnValue([mockUser, null]);
    useAuth.mockReturnValue(mockUser);
    render(<FoundPage posts={mockPosts} />);

    // Find your component elements
    const searchInput = screen.getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "Books" } });

    const posts = screen.queryAllByText("Airpods");
    expect(posts.length).toBe(0); // Two posts match the search query

    const posts2 = screen.queryAllByText("Books");
    expect(posts2.length).toBe(1);

    const posts3 = screen.queryAllByText("Engineering books");
    expect(posts3.length).toBe(1);

    screen.queryByText(/Found Items/);
  });
});
