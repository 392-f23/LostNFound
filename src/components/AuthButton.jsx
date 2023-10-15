import React from "react";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";
import { Outlet, NavLink } from "react-router-dom";

const SignInButton = () => (
  <button
    className="ms-auto btn btn-dark sign-in-button"
    onClick={signInWithGoogle}
  >
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark sign-in-button" onClick={signOut}>
    Sign out
  </button>
);

const ProfileButton = () => {
  return (
    <NavLink to="profilepage" className="fl-button">
      <i className="bi bi-person-circle"></i>
    </NavLink>
  );
};

const AuthButton = () => {
  const [user, isNorthwesternStudent] = useAuthState();
  return user ? <ProfileButton /> : <SignInButton />;
};

export default AuthButton;
