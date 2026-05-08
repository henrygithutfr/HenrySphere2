import React, { useState } from "react";

function AddBlog() {
  const [blog, setBlog] = useState({
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_author: "",
    meta_keyword: "",
    title: "",
    excerpt: "",
    author: "",
    cover: "",
    content: "",
    category: "",
    createdAt: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAt = new Date();
    const blogData = {
      slug: blog.slug,
      meta: {
        meta_title: blog.meta_title,
        meta_description: blog.meta_description,
        meta_author: blog.meta_author,
        meta_keyword: blog.meta_keyword,
      },
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      cover: blog.cover,
      content: blog.content,
      category: blog.category,
      createdAt: new Date(blog.createdAt),
      updatedAt: updatedAt,
      status: blog.status,
    };
    try {
  const response = await fetch("http://localhost:5001/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save blog");
  }

  alert("Blog saved successfully!");

  console.log(data);

  setBlog({
    slug: "",
    meta_title: "",
    meta_description: "",
    meta_author: "",
    meta_keyword: "",
    title: "",
    excerpt: "",
    author: "",
    cover: "",
    content: "",
    category: "",
    createdAt: "",
    status: "",
  });

} catch (error) {
  console.error(error);

  alert(error.message || "Something went wrong");
}
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Slug"
            value={blog.slug}
            onChange={(e) =>
              setBlog({ ...blog, slug: e.target.value.toLowerCase() })
            }
          />
          <input
            type="text"
            placeholder="Meta Title"
            value={blog.meta_title}
            onChange={(e) => setBlog({ ...blog, meta_title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Meta Description"
            value={blog.meta_description}
            onChange={(e) =>
              setBlog({ ...blog, meta_description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Meta Author"
            value={blog.meta_author}
            onChange={(e) => setBlog({ ...blog, meta_author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Meta Keyword"
            value={blog.meta_keyword}
            onChange={(e) => setBlog({ ...blog, meta_keyword: e.target.value })}
          />
          <input
            type="text"
            placeholder="Title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Excerpt"
            value={blog.excerpt}
            onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={blog.author}
            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cover img"
            value={blog.cover}
            onChange={(e) => setBlog({ ...blog, cover: e.target.value })}
          />
          <textarea
            placeholder="Content"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={blog.category}
            onChange={(e) =>
              setBlog({ ...blog, category: e.target.value.toLowerCase() })
            }
          />
          <input
            type="date"
            value={blog.createdAt}
            onChange={(e) => setBlog({ ...blog, createdAt: e.target.value })}
          />

          <select value={blog.status} onChange={(e) => setBlog({ ...blog, status: e.target.value })}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddBlog;
