"use client"
import Heading from '@/app/dashboard/components/heading'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from './components/addBlog/blogCard'

const Blogpage = () => {
  const [data, setData] = useState(null)
    useEffect(() => {
        const res = async() => {
            const hello = await axios.get('/api/blog/getblog')
            console.log(hello.data)
            setData(hello.data)
        }
        res()
    }, [])
  return (
    <div className="mt-[90px]">
      <Heading
        title="Splitat Blog"
        description="Explore ideas, guides, and the latest updates in development, tech, and beyond."
        className="text-center mb-4"
      />

      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="h-[100vh] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {data?.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogpage