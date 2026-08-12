import { createFileRoute } from "@tanstack/react-router";
import { getArticle } from "@/lib/content";
export const Route = createFileRoute("/dbgmd")({ component: () => <pre>{JSON.stringify(getArticle("zz-render-test")?.body)}</pre> });
