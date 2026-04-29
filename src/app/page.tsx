import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-12">
        <p className="text-xs text-stone-300 tracking-widest uppercase mb-1">Archive</p>
        <h1 className="text-lg font-light text-stone-700">すべての記録</h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-stone-300 text-sm">まだ何もない。</p>
      ) : (
        <ul className="space-y-0 divide-y divide-stone-100">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block py-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-stone-400 border border-stone-200 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <time className="text-[10px] text-stone-300 shrink-0 mt-0.5">
                    {formatDate(post.date)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
