"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const BlogPage = ({ slug }: { slug: string }) => {
  const [blog, setBlog] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blog/${slug}`);
        setBlog(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load blog");
      }
    };

    fetchBlog();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {blog.imageSrc && (
        <Image
          src={blog.imageSrc}
          alt={blog.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-xl"
        />
      )}

      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>

      <p className="text-gray-500 text-sm mt-2">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 whitespace-pre-line">{blog.content}</div>
    </div>
  );
};

export default BlogPage;
