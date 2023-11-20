import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "./PostCard";
import { useAuth } from "../contexts/AuthContext";

const mockDataImage = {
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
const mockDataNoImage = {
	contactInfo: "8471238890",
	description: "Charger",
	hidden: false,
	id: 1697673281449,
	image: "",
	location: "Kresge",
	lostOrFound: "lost",
	name: "John King",
	uid: "9NgmBelwvrdbN67HfZjWdEKtUVV2",
};
vi.mock("../contexts/AuthContext");
vi.mock("../utilities/firebase", () => {
	const actual = vi.importActual("../utilities/firebase"); // Import actual module
	return {
		...actual, // Use actual implementations of unmocked parts
		useAuthState: () => [
			/* mock user object */
		],
	};
});

const mockUser = {
	uid: "test-uid",
	email: "testuser@u.northwestern.edu",
	displayName: "Test User",
};
const badUser = {
	uid: "test-uid",
	email: "testuser@u.gmail.com",
	displayName: "Test User",
};

describe("PostCardImage", () => {
	it("renders image tag when imageUrl is provided", () => {
		const imageUrl = "https://example.com/image.jpg";
		render(<PostCard post={mockDataImage} />);

		// Assert that the image tag is rendered
		const imageElement = screen.getByAltText(mockDataImage.description);
		expect(imageElement).not.toBeNull();
	});

	it("does not render image tag when imageUrl is not provided", () => {
		render(<PostCard post={mockDataNoImage} />);

		// Assert that the image tag is not rendered
		const imageElement = screen.queryByAltText(mockDataNoImage.description);
		expect(imageElement).toBeNull();
	});
});
describe("PostCardAuth", () => {
	it("more info is available when signed in", () => {
		useAuth.mockReturnValue({ user: mockUser });
		render(<PostCard post={mockDataImage} />);

		// Assert that the image tag is rendered
		const button = screen.getByText("More Information");
		console.table(button.attributes.getNamedItem("disabled").value);
		expect(button.attributes.getNamedItem("disabled")).toBeUndefined;
	});

	it("does not button tag when user is not provided", () => {
		useAuth.mockReturnValue({ user: badUser });
		render(<PostCard post={mockDataImage} />);

		// Assert that the image tag is not rendered
		const button = screen.getByText("More Information");
		console.table(button.attributes.getNamedItem("disabled").value);
		expect(button.attributes.getNamedItem("disabled")).toBeTruthy;
	});
});
