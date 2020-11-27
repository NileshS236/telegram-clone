import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import "../styles/Login.css";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__telegram">
        <img src="/telegramLogo.png" alt="Telegram Logo" />
        <h1>Telegram</h1>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
