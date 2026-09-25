import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "/",
    "/pricing/",
    "/services/",
    "/work/",
    "/about/",
    "/contact/",
    "/free-website-check/",
    "/areas/",
    "/industries/",
    "/faq/",
    "/privacy/",
    "/terms/",
    ...projects.map((project) => `/work/${project.slug}/`),
    ...areas.map((area) => `/areas/${area.slug}/`),
    ...industries.map((industry) => `/industries/${industry.slug}/`),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}`, lastModified }));
}
