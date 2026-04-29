import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { marked } from "marked";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const html = await marked(post.content);

  return (
    <div>
      <Link
        href="/"
        className="inline-block text-xs text-zinc-700 hover:text-zinc-400 transition-colors mb-12 tracking-wider"
      >
        ← 戻る
      </Link>

      <article>
        <header className="mb-10">
          <time className="text-[10px] text-zinc-700 tracking-widest block mb-4">
            {formatDate(post.date)}
          </time>
          <h1 className="text-xl font-light text-zinc-200 leading-relaxed mb-5">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 border-t border-zinc-900" />
        </header>

        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  );
}
