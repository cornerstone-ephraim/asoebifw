import type { MetadataRoute } from "next";
const paths = [
  "",
  "/about",
  "/fashion-week",
  "/prize",
  "/vendor",
  "/after-party",
  "/accreditation",
];
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `https://asoebifw.com${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
