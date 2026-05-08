import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5001/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error(err.message));
  }, [slug]);
  return (
    <>
      <div>
        <div key={blog.id}>
          <img src={blog.cover} />
          <h1>{blog.title}</h1>
          <span>{blog.excerpt}</span>
          <h5>{blog.author}</h5>
          <p>{blog.content}</p>
          <span>{blog.category}</span>
          <span>{blog.createdAt}</span>
          <span>{blog.updatedAt}</span>
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
