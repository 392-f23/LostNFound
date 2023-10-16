import React, { useEffect, useState } from "react";
import "./FoundPage.css";
import { objectToArray } from "../utilities/helpers";
import PostCard from "../components/PostCard";
import SearchSort from "../components/SearchSort";

const FoundPage = ({ posts }) => {
	const [sortOption, setSortOption] = useState("newest");
	const [sortedPosts, setSortedPosts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	let formattedPosts = objectToArray(posts);
	formattedPosts = formattedPosts.filter((post) => !post.hidden);

	useEffect(() => {
		// Sort posts based on selected option

		if (sortOption === "newest") {
			formattedPosts.sort((x, y) => y.id - x.id);
		} else if (sortOption === "oldest") {
			formattedPosts.sort((x, y) => x.id - y.id);
		}

		// Filter posts based on the search query
		const filteredPosts = formattedPosts.filter((post) =>
			post.description.toLowerCase().includes(searchQuery.toLowerCase())
		);

		setSortedPosts(filteredPosts);
	}, [sortOption, searchQuery]);

	const handleSortChange = (e) => {
		setSortOption(e.target.value);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		// <div>
		<div className='lost-page container'>
			<h2>Found Items</h2>
			<SearchSort
				handleSearchChange={handleSearchChange}
				handleSortChange={handleSortChange}
				searchQuery={searchQuery}
				sortOption={sortOption}></SearchSort>
			<div className='card-container'>
				{sortedPosts.map((post) => (
					// <div className="card" key={post.id}>
					//   {/* <img src={card.imageUrl} alt={card.title} /> */}
					//   <h2>{post.description}</h2>
					//   <h4>Found in {post.location}</h4>
					//   <p>By: {post.name}</p>
					//   <button>Click here for more information</button>
					// </div>
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
		// </div>
	);
};

export default FoundPage;
