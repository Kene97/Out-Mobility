import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTAButton from "@/components/ui/CTAButton";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    alternates: { canonical: `/blog/${slug}` },
    title: `${post.title} — Out Mobility`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Out Mobility"],
      images: [{ url: "/og-image.png", width: 3600, height: 1890 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Out Mobility" },
    publisher: {
      "@type": "Organization",
      name: "Out Mobility",
      url: "https://woutside.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-white">

        {/* Article header */}
        <section className="px-4 pt-12 pb-8 md:px-8 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[760px]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[13px] text-[#003a50]/50 hover:text-[#00aeef] transition-colors mb-8"
                style={{ fontFamily: "var(--font-instrument-sans)" }}
              >
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M13.5 4.5L4.5 13.5M4.5 13.5H10.5M4.5 13.5V7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All posts
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[11px] font-semibold bg-[#e8f8ff] text-[#00aeef] px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-[12px] text-[#003a50]/40"
                  style={{ fontFamily: "var(--font-instrument-sans)" }}>
                  {formatDate(post.date)} · {post.readTime}
                </span>
              </div>

              <h1
                className="text-[#003a50] font-black uppercase mb-5"
                style={{
                  fontFamily: "var(--font-mona-sans)",
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                {post.title}
              </h1>
              <p className="text-[17px] text-[#003a50]/60 leading-[1.65] border-b border-[#003a50]/8 pb-8"
                style={{ fontFamily: "var(--font-instrument-sans)" }}>
                {post.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="px-4 pb-16 md:px-8 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div
              className="max-w-[760px] prose-out"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f6fcff] px-4 py-16 md:px-8 md:py-20 xl:px-20">
          <div className="max-w-[1440px] mx-auto max-w-[600px]">
            <h2
              className="text-[#003a50] font-black uppercase mb-3"
              style={{
                fontFamily: "var(--font-mona-sans)",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Ready to get started?
            </h2>
            <p className="text-[#003a50]/60 text-[15px] mb-8"
              style={{ fontFamily: "var(--font-instrument-sans)" }}>
              Join the waitlist and launch your first in-car campaign when we go live in your city.
            </p>
            <CTAButton className="text-[15px] py-4 px-8">
              GET EARLY ACCESS
            </CTAButton>
          </div>
        </section>

      </main>
      <Footer />
      </>
  );
}
