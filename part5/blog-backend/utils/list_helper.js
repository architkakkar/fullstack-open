const _ = require("lodash");

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupedByAuthor = _.groupBy(blogs, "author");
  const authorBlogCounts = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));

  const authorWithMostBlogs = _.maxBy(authorBlogCounts, "blogs");

  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupedByAuthor = _.groupBy(blogs, "author");
  const authorLikeCounts = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, "likes"),
  }));

  const authorWithMostLikes = _.maxBy(authorLikeCounts, "likes");

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
