import React, { useEffect, useState } from "react";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err.message));
  }, []);
  
  return (
    <>
      <div>
        {blogs.map((block) => {
          return (
            <div key={block.id}>
              <img src={block.cover}/>
              <h1>{block.title}</h1>
              <span>{block.excerpt}</span>
              <a href={`/blog/${block.slug}`}>Explore Blog</a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Blog;
