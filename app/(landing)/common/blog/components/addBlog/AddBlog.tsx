"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageSrc, setImage] = useState("");
  const [loading, setLoading] = useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await axios.post("/api/blog", {title, slug, content, excerpt, imageSrc} )
      console.log(res)
      setTitle("")
      setContent("")
      setExcerpt("")
      setImage("")
      setSlug("")
      setLoading(false)
    } catch (error) {
      
    }

    const blogData = {
      title,
      slug,
      content,
      excerpt,
      imageSrc,
    };

    console.log(blogData);
    // 🔥 send to API here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted p-4">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Blog</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Title */}
            <Input
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Slug */}
            <Input
              placeholder="Slug (e.g. my-first-blog)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            {/* Image URL */}
            <Input
              placeholder="Image URL"
              value={imageSrc}
              onChange={(e) => setImage(e.target.value)}
            />

            {/* Excerpt */}
            <Textarea
              placeholder="Short description (excerpt)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
            />

            {/* Content */}
            <Textarea
              placeholder="Write full blog content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />

            {/* Submit */}
            <Button disabled={loading} type="submit" className="w-full">
              Publish Blog 🚀
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;