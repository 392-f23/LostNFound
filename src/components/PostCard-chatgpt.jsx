import React from "react";

function PostCardAlternate({ post }) {
  const { description, name } = post;

  const cardStyle = {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={cardStyle}>
      <h3>{description}</h3>
      <p>{name}</p>
      <button style={buttonStyle}>More information</button>
    </div>
  );
}

export default PostCardAlternate;
