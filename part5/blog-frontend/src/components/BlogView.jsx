import { useEffect, useState } from "react";

import NewBlog from "./NewBlog";
import Blog from "./Blog";

import blogService from "../services/blogs";
import { STATUS } from "../constants/contants";
import Notification from "./Notification";

const BlogView = ({ username, onLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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
      setMessage(
        `a new blog '${savedBlog.title}' by '${savedBlog.author}' added`
      );
      setMessageType(STATUS.SUCCESS);
    } catch (error) {
      console.error("Error creating new blog:", error);
      setMessage("Error creating a new blog");
      setMessageType(STATUS.FAILURE);
    } finally {
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {message && <Notification message={message} type={messageType} />}
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
