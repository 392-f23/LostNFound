import React from "react";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
  const value = useAuth();
  const name = value.user.displayName;
  console.log("value", value);
  return (
    <div>
      <div>
        Welcome <b>{name}!</b>
      </div>
    </div>
  );
};

export default ProfilePage;
