import { MetadataRoute } from "next";
import prisma from "../lib/prisma";

export const dynamic = "force-dynamic";

// Convert title to SEO-friendly slug
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.Splitat.com";

  const stores = await prisma.store.findMany({
    select: {
      title: true,
      updatedAt: true,
    },
  });

  const storeUrls = stores.map((store) => ({
    url: `${baseUrl}/store/${slugify(store.title)}`,
    lastModified: store.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/common/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/common/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/common/career`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/common/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/common/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },

    // 🔥 THIS WAS MISSING
    ...storeUrls,
  ];
}
