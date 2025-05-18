import { useState } from "react";

const NewBlog = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();

    onCreate(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      <div>
        <label htmlFor="title">title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author: </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url: </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlog;
