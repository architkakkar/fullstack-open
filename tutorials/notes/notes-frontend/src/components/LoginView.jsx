import { useState } from "react";
import PropTypes from "prop-types";

import loginService from "../services/login";

const LOGIN_STATUS = {
  SUCCESS: "success",
  FAILURE: "failure",
};

const LoginView = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUsername("");
      setPassword("");
      onLogin(user, LOGIN_STATUS.SUCCESS);
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      onLogin(null, LOGIN_STATUS.FAILURE);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
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
