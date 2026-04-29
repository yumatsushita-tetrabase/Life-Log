import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Life Log",
    template: "%s | Life Log",
  },
  description: "曖昧なものを、言葉にしようとする試み",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-zinc-800">
            <div className="max-w-xl mx-auto px-6 py-6 flex items-center justify-between">
              <Link
                href="/"
                className="text-sm tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors uppercase"
              >
                Life Log
              </Link>
              <span className="text-xs text-zinc-700">曖昧なものを、言葉にする</span>
            </div>
          </header>

          <main className="flex-1 max-w-xl mx-auto w-full px-6 py-14">
            {children}
          </main>

          <footer className="border-t border-zinc-800 mt-auto">
            <div className="max-w-xl mx-auto px-6 py-6 text-center text-xs text-zinc-700">
              © {new Date().getFullYear()} — 記録は続く
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
