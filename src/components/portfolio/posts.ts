import { ARTICLES, type Article } from "@/data/articles";

export type Post = Article;

export function getPosts() {
  return ARTICLES;
}

export function getPost(slug: string) {
  return ARTICLES.find((p) => p.slug === slug);
}

export function usePosts() {
  return ARTICLES;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
