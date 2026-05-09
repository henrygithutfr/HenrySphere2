import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MetaTagHelmet from "../components/HelmetCom";
import ContentParser from "../components/ContentParserCom";

function SingleBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5001/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error(err.message));
  }, [slug]);
  if (!blog) return <h1>Loading...</h1>;
  return (
    <>
    <MetaTagHelmet title={blog.meta?.meta_title} description={blog.meta?.meta_description} author={blog.meta?.meta_author} keyword={blog.meta?.meta_keyword} />
      <div>
        <div key={blog.id}>
          <img src={blog.cover} />
          <h1>{blog.title}</h1>
          <span>{blog.excerpt}</span>
          <h5>{blog.author}</h5>
          <div><ContentParser content={blog.content} /></div>
          <span>{blog.category}</span>
          <span>{blog.createdAt}</span>
          <span>{blog.updatedAt}</span>
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
