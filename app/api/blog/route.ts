import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";




export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, slug, content, excerpt, imageSrc, author, published } = body;

    // Basic validation
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 },
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        imageSrc,
        author,
        published,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error(error);

    // Handle unique slug error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
