import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "./PostCard";

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

describe("PostCard", () => {
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
