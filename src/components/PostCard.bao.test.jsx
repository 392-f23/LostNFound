import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "./PostCard";
import { useAuth } from "../contexts/AuthContext";

const mockData = {
	contactInfo: "8471238890",
	description: "Charger",
	hidden: false,
	id: 1697673281449,
	image: "https://firebasestorage.googleapis.com/v0/b/lostnfound-c4ccf.appspot.com/o/C%3A%5Cfakepath%5CIMG_2553.JPG?alt=media&token=742439ac-2415-47ed-9710-12a94707ff78",
	location: "Kresge",
	lostOrFound: "lost",
	name: "John King",
	uid: "9NgmBelwvrdbN67HfZjWdEKtUVV2",
};

// vi.mock("../contexts/AuthContext", () => {
//     return {
//         useAuth: vi.fn().mockImplementation(() => ({
//             currentUser: {
//                 email: "testuser@u.northwestern.edu",
//                 uid: "test-uid",
//                 displayName: "Test User"
//             }
//         }))
//     };
// });

vi.mock("../utilities/firebase", () => {
    return {
      auth: {
        onAuthStateChanged: vi.fn((callback) => {
          callback(mockUser); // Simulate a user being signed in
          return () => {}; // Return a dummy unsubscribe function
        }),
        // ... other auth related mocks
      },
      // ... other mocks if needed
    };
  });
  
  vi.mock("../contexts/AuthContext", () => ({
    useAuth: vi.fn(() => ({
      user: mockUser,
      isNorthwesternStudent: true
    }))
  }));

// vi.mock("../utilities/firebase", () => {
// 	const actual = vi.importActual("../utilities/firebase"); // Import actual module
// 	return {
// 		...actual, // Use actual implementations of unmocked parts
// 		useAuthState: () => [
// 			/* mock user object */
// 		],
// 	};
// });

const mockUser = {
	uid: "test-uid",
	email: "testuser@u.northwestern.edu",
	displayName: "Test User",
};

describe("clicking more info", () => {
    it("should open a modal with name and contact info", async() => {
        // useAuth.mockReturnValue({ user: mockUser });

        render(<PostCard post={mockData}/>);
        const moreInfoButton = screen.getByText(/More Information/i);
		console.table(moreInfoButton.attributes.getNamedItem("disabled").value);
		expect(moreInfoButton.attributes.getNamedItem("disabled")).toBeUndefined();

        console.log(document.body.innerHTML); // This will output the current state of the document body for debugging
        const modal = await screen.findByText(/Item Details/);
        expect(modal).toBeInTheDocument();
    
        const contactInfo = await screen.findByText(mockData.contactInfo);
        expect(contactInfo).toBeInTheDocument();
    
        // Check for the name in the modal.
        const name = await screen.findByText(mockData.name);
        expect(name).toBeInTheDocument();
    });
});