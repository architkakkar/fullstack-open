const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const reducer = (fav, blog) => (blog.likes > fav.likes ? blog : fav);

  const favBlog = blogs.reduce(reducer, blogs[0]);

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
