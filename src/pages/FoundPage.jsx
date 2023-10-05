import React from "react";
import "./FoundPage.css";
import { objectToArray } from "../utilities/helpers";

const FoundPage = ({ posts }) => {
  const formattedPosts = objectToArray(posts);
  // sort by time
  formattedPosts.sort((x, y) => y.id - x.id);

  return (
    <div>
      <div className="lost-page container">
        <h2>Found Items</h2>
        <div className="card-container">
          {formattedPosts.map((post) => (
            <div className="card" key={post.id}>
              {/* <img src={card.imageUrl} alt={card.title} /> */}
              <h2>{post.description}</h2>
              <h4>Found in {post.location}</h4>
              <p>By: {post.name}</p>
              <button>Click here for more information</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoundPage;
