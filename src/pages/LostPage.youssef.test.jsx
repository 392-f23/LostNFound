import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LostPage from "./LostPage";
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

const mockPosts = {
    1: { id: 1, description: "Lost cat", hidden: false },
    2: { id: 2, description: "Lost dog", hidden: true },
    3: { id: 3, description: "Lost phone", hidden: false }
  };


describe("LostPage", () => {
    it("displays lost items when the lost tab is clicked", () => {
      // Render the LostPage component with mock posts
      useAuth.mockReturnValue({ user: mockUser });
      // Wrap the ProfilePage component in a Router for the test
    render(
        <Router>
          <LostPage posts={mockPosts} />
        </Router>
      );
  
      // Simulate user clicking on the lost tab
      // Assuming there's a button or a tab to click on. Adjust the query as per your actual implementation
      // fireEvent.click(screen.getByText('Lost Tab'));
  
      // Check if the heading 'Lost Items' is present
      expect(screen.getByText('Lost Items')).toBeTruthy();

      // Check if the lost items (that are not hidden) are displayed
      expect(screen.getByText('Lost cat')).to.exist;
      expect(screen.queryByText('Lost dog')).to.be.null; // This post is hidden
      expect(screen.getByText('Lost phone')).to.exist;

  
    
    });
  });
