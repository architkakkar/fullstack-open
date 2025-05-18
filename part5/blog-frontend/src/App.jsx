import { useState, useEffect } from "react";

import LoginView from "./components/LoginView";
import BlogView from "./components/BlogView";

import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedInUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      loginService.setToken(user.token);
    }
  }, []);

  const onLogin = (user) => {
    setUser(user);
    loginService.setToken(user.token);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div>
      {user === null ? (
        <LoginView onLogin={onLogin} />
      ) : (
        <BlogView username={user.name} onLogout={onLogout} />
      )}
    </div>
  );
};

export default App;
