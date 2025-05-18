import { useState } from "react";
import PropTypes from "prop-types";

import loginService from "../services/login";

const LOGIN_STATUS = {
  SUCCESS: "success",
  FAILURE: "failure ",
};

const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      onLogin(user, LOGIN_STATUS.SUCCESS);
    } catch (error) {
      console.error("Error while logging in:", error);
      onLogin(null, LOGIN_STATUS.FAILURE);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
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
