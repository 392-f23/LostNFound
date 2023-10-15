import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { objectToArray } from "../utilities/helpers";
import PostCard from "../components/PostCard";

const ProfilePage = ({ lostPosts, foundPosts }) => {
  const value = useAuth();
  const user = value.user;
  const name = user.displayName;
  const formattedLostPost = objectToArray(lostPosts).filter((post) => {
    return post.uid === user.uid;
  });

  const formattedFoundPost = objectToArray(foundPosts).filter((post) => {
    return post.uid === user.uid;
  });
  
  console.log("value", value);
  return (
    <div>
      <div>
        Welcome <b>{name}!</b>
      </div>
      <div className="card-container">
        lost
        {formattedLostPost.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        found
        {formattedFoundPost.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
