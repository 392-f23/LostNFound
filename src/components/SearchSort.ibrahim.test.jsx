import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LostPage from "../pages/LostPage";
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { useAuth } from "../contexts/AuthContext";


vi.mock("../contexts/AuthContext");
vi.mock('../utilities/firebase', () => {
    const actual = vi.importActual('../utilities/firebase'); // Import actual module
    return {
      ...actual, // Use actual implementations of unmocked parts
      useAuthState: () => [/* mock user object */],
    };
  });
  

const mockUser = {
  uid: "test-uid",
  email: "testuser@u.northwestern.edu",
  displayName: "Test User",
};

// Mock posts with timestamps
const mockPosts = {
  1: { id: 1, description: "Lost item 1", timestamp: 300, hidden: false },
  2: { id: 2, description: "Lost item 2", timestamp: 200, hidden: false },
  3: { id: 3, description: "Lost item 3", timestamp: 100, hidden: false }
};

describe("LostPage", () => {
  it("sorts posts by newest when newest filter is selected", () => {
    useAuth.mockReturnValue({ user: mockUser });
      // Wrap the ProfilePage component in a Router for the test
    render(
        <Router>
          <LostPage posts={mockPosts} />
        </Router>
      );
    // Find and select the 'newest' option in the sort dropdown
    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'newest' } });

    // Assuming PostCard components render the description and timestamp, check the order
    const postCards = screen.getAllByText(/Lost item/);
    expect(postCards[0].textContent).to.include('Lost item 3');
    expect(postCards[1].textContent).to.include('Lost item 2');
    expect(postCards[2].textContent).to.include('Lost item 1');
  });
});
