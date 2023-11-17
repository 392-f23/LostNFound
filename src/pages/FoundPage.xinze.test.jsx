import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FoundPage from "./FoundPage";
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

vi.mock("../contexts/AuthContext");
vi.mock('../utilities/firebase', () => {
    const actual = vi.importActual('../utilities/firebase');
    return {
        ...actual,
        useAuthState: () => [/* mock user object */],
    };
});

vi.mocked(useAuth).mockImplementation(() => ({
    currentUser: mockUser,
}));

const mockUser = {
    uid: "test",
    email: "test@u.northwestern.edu",
    displayName: "test",
};

const mockPosts = {
    1: { id: 1, description: "Lost airpods", hidden: false },
    2: { id: 2, description: "Lost ipad", hidden: false },
    3: { id: 3, description: "Lost water bottle", hidden: true }
};

describe('FoundPage Tests', () => {
    it('should display found items when the Found tab is clicked', async () => {
        // Render the FoundPage within a Router
        render(
            <Router>
                <FoundPage posts={mockPosts} />
            </Router>
        );

        // Optionally, check if the "Found" tab is present and simulate a click
        const foundTab = screen.getByText('Found Items');
        fireEvent.click(foundTab);

        // Check for the presence of specific UI elements or behaviors
        // For example, verify the heading, and check if the correct items are displayed
        const heading = screen.getByRole('heading', { name: /found items/i });
        expect(heading).toBeTruthy();

        // Optionally, verify that the non-hidden posts are displayed
        expect(screen.getByText("Lost airpods")).to.exist;
        expect(screen.getByText("Lost ipad")).to.exist;
        expect(screen.queryByText("Lost water bottle")).to.be.null; // Hidden post should not be displayed
    });
});

