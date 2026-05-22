"use client";

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";




const BlogPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  

  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    const handleBlog = async () => {
      try {
        const res = await axios.post("/api/blog/getslug", {
          slug: slug,
        });
        setBlog(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    handleBlog();
  }, [slug]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="w-full mx-auto p-[30px] h-[100vh] mt-[50px] rounded-2xl">
      {blog.imageSrc && (
        <Image
          src={blog.imageSrc}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-xl"
          width={500}
          height={500}
        />
      )}

      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>

      <p className="text-gray-500 text-sm mt-2">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 text-gray-800 dark:text-white whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogPage;
