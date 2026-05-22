import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { slug: string };
};

// ✅ Metadata
export async function generateMetadata({ params }: Props) {
    const blog = await params;
  return {
    title: blog.slug,
    description: `Blog about ${blog.slug}`,
  };
}

// ✅ REQUIRED default export
export default function BlogLayout({ children }: Props) {
  return <div>{children}</div>;
}
