import { useState } from "react";
import PropTypes from "prop-types";

import Notification from "./Notification";

import loginService from "../services/login";
import { STATUS } from "../constants/contants";

const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      onLogin(user);
    } catch (error) {
      console.error("Error while logging in:", error);
      setMessage("wrong username or password");
      setMessageType(STATUS.FAILURE);
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      {message && <Notification message={message} type={messageType} />}
      <div>
        <label htmlFor="username">username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginView.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginView;
