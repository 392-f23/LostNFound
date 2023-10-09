import React from "react";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

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

const AuthButton = () => {
  const [user, isNorthwesternStudent] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

export default AuthButton;
