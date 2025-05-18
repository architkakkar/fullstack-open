import { useEffect, useState } from "react";

import NewBlog from "./NewBlog";
import Blog from "./Blog";

import blogService from "../services/blogs";

const BlogView = ({ username, onLogout }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const onCreate = async (title, author, url) => {
    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));
    } catch (error) {
      console.error("Error creating new blog:", error);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {username} logged in{" "}
        <button type="button" onClick={onLogout}>
          logout
        </button>
      </p>
      <NewBlog onCreate={onCreate} />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogView;
