import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5001/admin/api/blogs/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch((err) => {
        console.error(err.message);
        setError("Failed to load blog");
      });
  }, [slug]);

  const submitUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedBlog = {
        ...blog,
        updatedAt: new Date().toISOString(), // Use ISO string format
      };

      const response = await fetch(`http://localhost:5001/api/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseAlt = await fetch(`http://localhost:5001/admin/api/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!responseAlt.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      alert("Blog updated successfully!");
      
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message);
      alert(`Failed to update blog: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!blog && !error) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <form onSubmit={submitUpdate}>
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
          value={blog.meta?.meta_title || ""}
          onChange={(e) =>
            setBlog({
              ...blog,
              meta: {
                ...blog.meta,
                meta_title: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Meta Description"
          value={blog.meta?.meta_description || ""}
          onChange={(e) =>
            setBlog({
              ...blog,
              meta: {
                ...blog.meta,
                meta_description: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Meta Author"
          value={blog.meta?.meta_author || ""}
          onChange={(e) =>
            setBlog({
              ...blog,
              meta: {
                ...blog.meta,
                meta_author: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Meta Keyword"
          value={blog.meta?.meta_keyword || ""}
          onChange={(e) =>
            setBlog({
              ...blog,
              meta: {
                ...blog.meta,
                meta_keyword: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Title"
          value={blog.title || ""}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Excerpt"
          value={blog.excerpt || ""}
          onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={blog.author || ""}
          onChange={(e) => setBlog({ ...blog, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cover img"
          value={blog.cover || ""}
          onChange={(e) => setBlog({ ...blog, cover: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={blog.content || ""}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={blog.category || ""}
          onChange={(e) =>
            setBlog({ ...blog, category: e.target.value.toLowerCase() })
          }
        />
        <input
          type="date"
          value={blog.createdAt ? blog.createdAt.split("T")[0] : ""}
          onChange={(e) => setBlog({ ...blog, createdAt: e.target.value })}
        />
        <select
          value={blog.status || "draft"}
          onChange={(e) => setBlog({ ...blog, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default UpdateBlog;