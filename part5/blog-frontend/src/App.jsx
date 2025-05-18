import { useState, useEffect } from "react";

import LoginView from "./components/LoginView";
import Blog from "./components/Blog";

import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedInUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const onLogin = (user, status) => {
    if (status === "success") {
      setUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
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
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{" "}
            <button type="button" onClick={onLogout}>
              logout
            </button>
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
