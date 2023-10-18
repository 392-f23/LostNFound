import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { objectToArray } from "../utilities/helpers";
import PostCard from "../components/PostCard";
import ProfileCard from "../components/ProfileCard";
import { signOut } from "../utilities/firebase";
import { useNavigate } from "react-router";

const ProfilePage = ({ lostPosts, foundPosts }) => {
  const value = useAuth();
  const user = value.user;
  const name = user.displayName;
  const formattedLostPost = objectToArray(lostPosts).filter((post) => {
    return post.uid === user.uid && !post.hidden;
  });

  const formattedFoundPost = objectToArray(foundPosts).filter((post) => {
    return post.uid === user.uid && !post.hidden;
  });

  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
    signOut();
  };

  console.log("formattedLostPost", formattedLostPost);

  console.log("value", value);
  return (
    <div>
      <div>
        Welcome <b>{name}!</b>
      </div>
      <br />
      <div className="card-container">
        {formattedLostPost.length > 0 ? <b>Lost posts</b> : null}
        {formattedLostPost.length > 0 ? (
          formattedLostPost.map((post) => (
            <ProfileCard key={post.id} post={post} />
          ))
        ) : (
          <div>Items you post as lost will appear here</div>
        )}
        <br />
        {formattedFoundPost.length > 0 ? <b>Found posts</b> : null}
        {formattedFoundPost.length > 0 ? (
          formattedFoundPost.map((post) => (
            <ProfileCard key={post.id} post={post} />
          ))
        ) : (
          <div>Items you post as found will appear here</div>
        )}
        <button
          className="ms-auto btn btn-dark sign-in-button"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
