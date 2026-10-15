import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/structuredData";

// /band は noindex のメタタグで検索から外す（Disallow するとクローラーが noindex を読めなくなるため）
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
