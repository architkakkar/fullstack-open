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

  const onLogin = (user, status) => {
    if (status === "success") {
      setUser(user);
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginView onLogin={onLogin} />
      ) : (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
