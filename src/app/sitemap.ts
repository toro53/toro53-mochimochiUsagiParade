import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/structuredData";

// 検索に出したいページだけを載せる（/listen と /band は noindex）
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL }];
}
