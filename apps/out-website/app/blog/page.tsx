import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog — Out Mobility",
  description:
    "Insights on in-car advertising, verified impressions, fleet monetisation, and the future of mobility marketing.",
  openGraph: {
    title: "Blog — Out Mobility",
    description: "Insights on in-car advertising, fleet monetisation, and mobility marketing.",
    images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
  },
};

const categoryColors: Record<string, string> = {
  Advertising: "bg-[#e8f8ff] text-[#00aeef]",
  Industry:    "bg-[#f0f9f4] text-[#1a7a4a]",
  "How-to":    "bg-[#fff8e8] text-[#b07c00]",
  Fleet:       "bg-[#f4f0f9] text-[#5a1a7a]",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">

        {/* Header */}
        <section className="px-4 py-16 md:px-8 md:py-20 xl:px-20 border-b border-[#003a50]/8">
          <div className="max-w-[1440px] mx-auto">
            <h1
              className="font-black uppercase text-[#003a50] leading-[0.92] mb-4"
              style={{
                fontFamily: "var(--font-mona-sans)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Blog.
            </h1>
            <p className="text-[16px] text-[#003a50]/55 max-w-[480px]"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              Insights on in-car advertising, fleet monetisation, and the infrastructure behind verified impressions.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16 xl:px-20">
          <div className="max-w-[1440px] mx-auto">

            {/* Featured post */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block mb-10">
                <div className="bg-[#003a50] rounded-3xl p-8 md:p-12 hover:bg-[#004d6b] transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category] ?? "bg-[#f9fafb] text-[#003a50]"}`}>
                      {featured.category}
                    </span>
                    <span className="text-[12px] text-white/40"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {formatDate(featured.date)} · {featured.readTime}
                    </span>
                  </div>
                  <h2
                    className="text-white font-black mb-3 group-hover:text-[#00aeef] transition-colors"
                    style={{
                      fontFamily: "var(--font-mona-sans)",
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-white/55 text-[15px] leading-[1.65] max-w-[640px]"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    {featured.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[#00aeef] text-[13px] font-semibold"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    Read article
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            )}

            {/* Rest of posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-[#f9fafb] rounded-2xl p-6 h-full flex flex-col gap-4 hover:bg-[#f0f9ff] transition-colors">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] ?? "bg-white text-[#003a50]"}`}>
                        {post.category}
                      </span>
                      <span className="text-[11px] text-[#003a50]/40"
                        style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        {post.readTime}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2
                        className="text-[#003a50] font-semibold mb-2 group-hover:text-[#00aeef] transition-colors leading-[1.3]"
                        style={{ fontFamily: "var(--font-cal-sans)", fontSize: "1.05rem" }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-[13px] text-[#003a50]/55 leading-[1.65]"
                        style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        {post.excerpt}
                      </p>
                    </div>
                    <p className="text-[12px] text-[#003a50]/35"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      {formatDate(post.date)}
                    </p>
                  </article>
                </Link>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
