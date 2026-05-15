import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://woutside.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/outdoor`,  changeFrequency: "weekly",  priority: 1.0 },
    // future product pages — re-add when launched:
    // { url: `${base}/ride`,     changeFrequency: "monthly", priority: 0.9 },
    // { url: `${base}/drive`,    changeFrequency: "monthly", priority: 0.9 },
    // { url: `${base}/charge-ev`, changeFrequency: "monthly", priority: 0.9 },
    // { url: `${base}/co2`,      changeFrequency: "monthly", priority: 0.9 },
    // { url: `${base}/about`,    changeFrequency: "monthly", priority: 0.9 },
    // { url: `${base}/advertise`, changeFrequency: "monthly", priority: 0.8 },
    // { url: `${base}/fleet`,    changeFrequency: "monthly", priority: 0.8 },
    // { url: `${base}/pricing`,  changeFrequency: "monthly", priority: 0.8 },
    // { url: `${base}/how-it-works`, changeFrequency: "monthly", priority: 0.7 },
    // { url: `${base}/contact`,  changeFrequency: "yearly",  priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
